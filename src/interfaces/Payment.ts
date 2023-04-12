export interface CmsPayment {
  id: string
  object: string
  amount: number
  amount_capturable: number
  amount_details: {
    tip: {}
  }
  amount_received: number
  application: null
  application_fee_amount: null
  automatic_payment_methods: {
    enabled: true
  }
  canceled_at: null
  cancellation_reason: null
  capture_method: string
  client_secret: string
  confirmation_method: string
  created: number
  currency: string
  customer: string
  description: null
  invoice: null
  last_payment_error: null
  latest_charge: null
  livemode: false
  metadata: {}
  next_action: null
  on_behalf_of: null
  payment_method: null
  payment_method_options: {
    card: {
      installments: null
      mandate_options: null
      network: null
      request_three_d_secure: string
    }
    cashapp: {}
    link: {
      persistent_token: null
    }
  }
  payment_method_types: []
  processing: null
  receipt_email: null
  review: null
  setup_future_usage: null
  shipping: null
  source: null
  statement_descriptor: null
  statement_descriptor_suffix: null
  status: string
  transfer_data: null
  transfer_group: null
}
