import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled  }) {
  const IMG_URL_COVER = (new URL('../Games/img/cover.png', import.meta.url)).href

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src={IMG_URL_COVER} onClick={handleClick} alt="cover" />
      </div>
    </div>
  )
}