import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { KonnectService } from '../../lib/konnectService';

interface PaymentStatus {
  status: 'success' | 'fail' | 'pending' | 'error';
  message: string;
  paymentRef?: string;
  amount?: number;
  currency?: string;
}

const KonnectRetour: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const status = searchParams.get('status');
    const paymentRef = searchParams.get('payment_ref');

    if (!status || !paymentRef) {
      setError('Paramètres de retour manquants');
      setLoading(false);
      return;
    }

    // Vérifier le statut du paiement
    verifyPaymentStatus(paymentRef, status);
  }, [searchParams]);

  const verifyPaymentStatus = async (paymentRef: string, status: string) => {
    try {
      setLoading(true);

      if (status === 'success') {
        // Vérifier le statut réel via l'API
        const verification = await KonnectService.verifyPayment(paymentRef);
        
        if (verification.enrolled) {
          setPaymentStatus({
            status: 'success',
            message: 'Paiement confirmé avec succès !',
            paymentRef,
            amount: verification.amount,
            currency: verification.currency
          });
        } else {
          setPaymentStatus({
            status: 'pending',
            message: 'Paiement en cours de traitement...',
            paymentRef
          });
        }
      } else if (status === 'fail') {
        setPaymentStatus({
          status: 'fail',
          message: 'Le paiement a échoué ou a été annulé.',
          paymentRef
        });
      } else {
        setPaymentStatus({
          status: 'error',
          message: 'Statut de paiement inconnu.',
          paymentRef
        });
      }
    } catch (err) {
      console.error('Erreur vérification paiement:', err);
      setError('Erreur lors de la vérification du paiement');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'fail':
        return <XCircle className="h-16 w-16 text-red-500" />;
      case 'pending':
        return <Clock className="h-16 w-16 text-yellow-500" />;
      default:
        return <AlertCircle className="h-16 w-16 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'fail':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50';
      case 'fail':
        return 'bg-red-50';
      case 'pending':
        return 'bg-yellow-50';
      default:
        return 'bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Vérification du paiement en cours...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
              <p className="text-red-700 mb-6">{error}</p>
              <button
                onClick={() => navigate('/formations')}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Retour aux formations
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!paymentStatus) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`${getStatusBgColor(paymentStatus.status)} border border-gray-200 rounded-lg p-8 text-center`}>
            {getStatusIcon(paymentStatus.status)}
            
            <h1 className={`text-3xl font-bold ${getStatusColor(paymentStatus.status)} mt-6 mb-4`}>
              {paymentStatus.status === 'success' && 'Paiement réussi !'}
              {paymentStatus.status === 'fail' && 'Paiement échoué'}
              {paymentStatus.status === 'pending' && 'Paiement en cours'}
              {paymentStatus.status === 'error' && 'Erreur de paiement'}
            </h1>
            
            <p className="text-lg text-gray-700 mb-6">
              {paymentStatus.message}
            </p>

            {paymentStatus.paymentRef && (
              <div className="bg-white rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">Référence de paiement</p>
                <p className="font-mono text-lg font-semibold text-gray-800">
                  {paymentStatus.paymentRef}
                </p>
              </div>
            )}

            {paymentStatus.amount && paymentStatus.currency && (
              <div className="bg-white rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">Montant payé</p>
                <p className="text-2xl font-bold text-green-600">
                  {paymentStatus.amount} {paymentStatus.currency}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {paymentStatus.status === 'success' && (
                <>
                  <p className="text-green-700">
                    ✅ Votre inscription a été confirmée avec succès !
                  </p>
                  <p className="text-gray-600">
                    Vous recevrez un email de confirmation avec tous les détails de la formation.
                  </p>
                </>
              )}

              {paymentStatus.status === 'fail' && (
                <>
                  <p className="text-red-700">
                    ❌ Le paiement n'a pas pu être traité.
                  </p>
                  <p className="text-gray-600">
                    Vous pouvez réessayer ou nous contacter pour une assistance.
                  </p>
                </>
              )}

              {paymentStatus.status === 'pending' && (
                <>
                  <p className="text-yellow-700">
                    ⏳ Votre paiement est en cours de traitement.
                  </p>
                  <p className="text-gray-600">
                    Vous recevrez une confirmation par email une fois le paiement validé.
                  </p>
                </>
              )}
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => navigate('/formations')}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                Retour aux formations
              </button>
              
              <button
                onClick={() => navigate('/contact')}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto ml-0 sm:ml-3"
              >
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KonnectRetour;

