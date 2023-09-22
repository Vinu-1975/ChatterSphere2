import { styled } from 'styled-components'
import PropTypes from 'prop-types';

UserBadge.propTypes = {
    handleFunction: PropTypes.func.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired
};

export default function UserBadge({handleFunction,user}) {
  return (
    <Box>
        {user.username}
        <i className="fa-solid fa-xmark" onClick={handleFunction}></i>
    </Box>
  )
}

const Box = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 3px 7px;
    border-radius: 1rem;
    margin:5px;
    border: 1px solid black;
    cursor: pointer;
`