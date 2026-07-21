import { useState } from 'react';
import { Clock, Tag, ChevronDown, Calendar } from 'lucide-react';
import { type Service, TIME_SLOTS } from '../lib/constants';
import { useBookings } from '../lib/booking-context';
import { BookingModal } from './BookingModal';

interface ServiceCardProps {
  service: Service;
  index: number;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const { getBookedSlots } = useBookings();
  const [expanded, setExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const bookedSlots = getBookedSlots(selectedDate).map((b) => b.booked_time);

  const minDate = formatDate(new Date());
  const maxDate = formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  const handleBookClick = () => {
    if (!expanded) {
      setExpanded(true);
      return;
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTime(null);
  };

  return (
    <div className="bg-white shadow-lg group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'grayscale(0.3) contrast(1.1) brightness(0.85)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block bg-forest text-white text-xs font-heading uppercase tracking-wider px-3 py-1 mb-2">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl text-white font-bold">{service.name}</h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-2 text-charcoal/70">
            <Clock size={16} className="text-forest" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center gap-2 font-heading font-bold text-lg text-charcoal">
            <Tag size={16} className="text-burgundy" />
            <span>{service.price} KM</span>
          </div>
        </div>

        {!expanded ? (
          <button onClick={handleBookClick} className="btn-primary w-full mt-auto">
            Rezerviši termin
          </button>
        ) : (
          <div className="mt-auto space-y-4 animate-fade-in">
            <div>
              <label className="flex items-center gap-2 text-xs font-heading uppercase tracking-wide text-charcoal/70 mb-2">
                <Calendar size={14} /> Odaberi dan
              </label>
              <input
                type="date"
                value={selectedDate}
                min={minDate}
                max={maxDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(null);
                }}
                className="input-field"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-heading uppercase tracking-wide text-charcoal/70 mb-2">
                <Clock size={14} /> Slobodni termini
              </label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      disabled={isBooked}
                      onClick={() => handleTimeSelect(slot)}
                      className={`px-2 py-2 text-sm font-heading font-medium border-2 transition-all ${
                        isBooked
                          ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-forest text-white border-forest'
                          : 'bg-white text-charcoal border-charcoal/20 hover:border-forest hover:text-forest'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setExpanded(false)}
              className="flex items-center justify-center gap-1 text-xs font-heading uppercase tracking-wide text-charcoal/60 hover:text-charcoal w-full pt-1"
            >
              <ChevronDown size={14} className="rotate-180" /> Zatvori
            </button>
          </div>
        )}
      </div>

      {showModal && selectedTime && (
        <BookingModal
          service={service}
          date={selectedDate}
          time={selectedTime}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
