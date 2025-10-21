import { supabase } from './supabase';

export interface KonnectInitResponse {
  paymentUrl: string;
  paymentRef: string;
}

export interface KonnectVerifyResponse {
  status: 'created' | 'pending' | 'succeeded' | 'failed' | 'canceled' | 'not_found';
  enrolled: boolean;
  paymentRef?: string;
  amount?: number;
  currency?: string;
}

export class KonnectService {
  /**
   * Initialise un paiement Konnect pour une formation
   */
  static async initPayment(trainingId: number): Promise<KonnectInitResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('konnect-init', {
        body: { trainingId }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.paymentUrl) {
        throw new Error('No payment URL received from Konnect');
      }

      return {
        paymentUrl: data.paymentUrl,
        paymentRef: data.paymentRef
      };
    } catch (error) {
      console.error('Error initializing Konnect payment:', error);
      throw error;
    }
  }

  /**
   * Vérifie le statut d'un paiement
   */
  static async verifyPayment(paymentRef?: string, trainingId?: number): Promise<KonnectVerifyResponse> {
    try {
      const params = new URLSearchParams();
      if (paymentRef) params.append('payment_ref', paymentRef);
      if (trainingId) params.append('trainingId', trainingId.toString());

      const { data, error } = await supabase.functions.invoke(`konnect-verify?${params.toString()}`);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('Error verifying Konnect payment:', error);
      throw error;
    }
  }

  /**
   * Redirige vers l'URL de paiement Konnect
   */
  static redirectToPayment(paymentUrl: string): void {
    window.location.href = paymentUrl;
  }

  /**
   * Vérifie si un utilisateur est inscrit à une formation
   */
  static async checkEnrollment(trainingId: number): Promise<boolean> {
    try {
      const response = await this.verifyPayment(undefined, trainingId);
      return response.enrolled;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  }
}






