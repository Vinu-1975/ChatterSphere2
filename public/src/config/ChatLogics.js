export const getSender = (loggedUser,users) => {
    // return users[0]._id === loggedUser._id? users[1].username : users[0].username
    return users[0]._id === loggedUser._id? users[1] : users[0]
}

export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i+1].sender._id !== m.sender._id ||
            messages[i+1].sender._d === undefined) &&
        messages[i].sender._id !== userId
    )
}

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length -1 &&
        messages[messages.length-1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    )
}

export const isSameSenderMargin = (messages, m, i, userId )=> {
    if (
        i < messages.length - 1 &&
        messages[i+1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 13
    else if (
        ( i< messages.length - 1 &&
            messages[i+1].sender._id !== m.sender._id &&
            messages[i].sender._id!== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 13
    else return "auto"
}

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i-1].sender._id === m.sender._id
}