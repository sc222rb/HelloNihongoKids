import PropTypes from 'prop-types'
import './SingleCard.css'

/**
 * SingleCard component representing a single card in the memory game.
 * @param {Object} props - Props for the SingleCard component.
 * @param {Object} props.card - The card object containing information about the card.
 * @param {Function} props.handleChoice - Function to handle the card choice.
 * @param {boolean} props.flipped - Indicates whether the card is flipped.
 * @param {boolean} props.disabled - Indicates whether the card is disabled.
 * @returns {JSX.Element} SingleCard component.
 */
function SingleCard({ card, handleChoice, flipped, disabled }) {
  const emojiFlower = '\u{1F338}'

  /**
   * Handles the click event on the card.
   * @returns {void}
   */
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front" src={card.src}>{card.text}</div>
        <div className="back" onClick={handleClick}>{emojiFlower}</div>
      </div>
    </div>
  )
}

SingleCard.propTypes = {
  card: PropTypes.object.isRequired, // The card object containing information about the card
  handleChoice: PropTypes.func.isRequired, // Function to handle the card choice
  flipped: PropTypes.bool.isRequired, // Indicates whether the card is flipped
  disabled: PropTypes.bool.isRequired, // Indicates whether the card is disabled
}

export default SingleCard