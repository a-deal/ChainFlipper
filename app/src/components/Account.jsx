import React from 'react'
import PropTypes from 'prop-types'

Account.propTypes = {
    account: PropTypes.Object
}

const Account = ({ account }) => {
    return (
        <section>
            <h2>Your account information</h2>
            <p>Address: {account.userAddress}</p>
            <p>Balance: {account.balance}</p>
        </section>
    )
}

export default Account
