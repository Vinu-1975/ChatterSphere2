import { styled } from 'styled-components';
import PropTypes from 'prop-types'

SenderCard.propTypes = {
    sender: PropTypes.shape({
        avatarImage: PropTypes.string.isRequired,
        username: PropTypes.string,
        isGroupChat: PropTypes.bool,
        chatName: PropTypes.string
    }).isRequired
};

export default function SenderCard({ sender }) {
  return (
        <StyledSenderCard>
            {/* <div className="padding-provider"> */}
                <img src={sender.avatarImage} alt={`${sender.username}'s avatar`} className="avatar" />
                <div className="sender-details">
                    <h4>{sender.isGroupChat?sender.chatName:sender.username}</h4>
                </div>
            {/* </div> */}
            
        </StyledSenderCard>
    );
}

const StyledSenderCard = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
    height: 4.7rem;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    border-radius: 12px;
    background-color: #f3ecd0;
    background-color: #E5D283;
    background-color: #ffffff;


    .avatar {
        width: 50px;  // Adjust as per your requirements
        height: 50px;
        border-radius: 50%;
        margin:0 20px;
        margin-right: 10px;
        
    }

    .sender-details {
        /* border: 1px solid black; */
        margin:10px;
        h4 {
            margin: 0px;
            font-weight: bold;
        }

        p {
            margin: 0;
            font-size: 0.8em;
            color: gray;
            padding: 5px 0;
        }
    }
`;