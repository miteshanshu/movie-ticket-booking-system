import { useState } from 'react'

const PaymentForm = ({ amount, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      onSuccess()
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4>Payment Details</h4>
      <p>Total Amount: ${amount.toFixed(2)}</p>
      
      <div className="form-group">
        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Name on Card</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
      
      <button
        type="submit"
        className="btn btn-primary"
        disabled={processing}
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}

export default PaymentForm