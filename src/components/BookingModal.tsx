import { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Scissors } from 'lucide-react';
import { BARBERS, type Service } from '../lib/constants';
import { useBookings } from '../lib/booking-context';
import { useToast } from './Toast';

interface BookingModalProps {
  service: Service;
  date: string;
  time: string;
  onClose: () => void;
}

export function BookingModal({ service, date, time, onClose }: BookingModalProps) {
  const { addBooking } = useBookings();
  const { showToast } = useToast();
  const [ime, setIme] = useState('');
  const [phone, setPhone] = useState('');
  const [barber, setBarber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ime || !phone || !barber) {
      showToast('Molimo popunite sva polja.', 'error');
      return;
    }
    setSubmitting(true);
    const result = await addBooking({
      client_name: ime,
      phone,
      barber,
      service_name: service.name,
      service_duration: service.duration,
      service_price: service.price,
      booked_date: date,
      booked_time: time,
    });
    setSubmitting(false);
    if (result.success) {
      showToast('Termin uspješno rezervisan!', 'success');
      onClose();
    } else {
      showToast('Greška pri rezervaciji. Pokušajte ponovo.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-offwhite w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up">
        <div className="bg-charcoal text-white px-6 py-5 flex items-center justify-between">
          <h3 className="text-xl font-bold">Rezervacija termina</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={22} />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="bg-white border-l-4 border-forest px-4 py-3 mb-5 space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <Scissors size={15} className="text-forest" />
              <span className="font-heading uppercase font-medium">{service.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-charcoal/70">
              <Calendar size={15} />
              <span>{new Date(date).toLocaleDateString('bs-BA', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-charcoal/70">
              <Clock size={15} />
              <span>{time}h · {service.duration} min · {service.price} KM</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-charcoal/70 mb-1.5">
                Ime
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="text"
                  value={ime}
                  onChange={(e) => setIme(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Vaše ime"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-charcoal/70 mb-1.5">
                Broj telefona
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field pl-10"
                  placeholder="062 123 456"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wide text-charcoal/70 mb-1.5">
                Odaberi barbera
              </label>
              <select
                value={barber}
                onChange={(e) => setBarber(e.target.value)}
                className="input-field"
                required
              >
                <option value="">— Izaberite barbera —</option>
                {BARBERS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="bg-burgundy/10 border-l-4 border-burgundy px-4 py-3 mt-2">
              <p className="text-xs font-body text-charcoal leading-relaxed">
                <strong className="font-heading uppercase text-burgundy">Napomena:</strong>{' '}
                Dozvoljeno kašnjenje je maksimalno 5 minuta, nakon toga termin će se smatrati propuštenim.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-burgundy w-full disabled:opacity-60"
            >
              {submitting ? 'Rezervišem...' : 'Rezerviraj'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
