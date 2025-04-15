import { useState } from 'react'

const PaymentForm = ({ onPayment, amount, loading }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onPayment({
      cardNumber,
      expiry,
      cvv,
      name,
      amount
    })
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4>Payment Details</h4>
      <p>Total Amount: ${amount.toFixed(2)}</p>
      
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
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Confirm Booking'}
      </button>
    </form>
  )
}

export default PaymentForm