import { styled } from 'styled-components'
import PropTypes from 'prop-types';

UserCard.propTypes = {
    user: PropTypes.shape({
        avatarImage: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default function UserCard({ user,onClick }) {
  return (
    <StyledUserCard onClick={onClick}>
        <img src={user.avatarImage} alt={`${user.username}`} />
        <div className="userInfo">
            <h3>{user.username}</h3>
            <p>last Message</p>
        </div>
    </StyledUserCard>
  )
}

const StyledUserCard = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #e5e5e5;
    transition: background-color 0.2s;
    background-color: #f9f4e1;
    &:hover {
      background-color: #f6f6f6;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%; // makes it circular
      object-fit: cover;  // ensures the image scales properly
      margin-right: 12px;
    }

    .userInfo {
      flex: 1;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }

      p {
        margin: 4px 0 0;
        font-size: 14px;
        color: #777;
      }
    }
`