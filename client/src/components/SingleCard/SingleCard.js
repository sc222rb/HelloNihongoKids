import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const emojiFlower = '\u{1F338}'

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front" src={card.src} alt="card front">{card.text}</div>
        <div className="back" onClick={handleClick}>{emojiFlower}</div>
      </div>
    </div>
  )
}