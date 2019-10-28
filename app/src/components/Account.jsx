import React from "react";
import PropTypes from "prop-types";

const Account = ({ account }) => {
  return (
    <section>
      <h2>Your account information</h2>
      <p>Address: {account.address}</p>
      <p>Balance: {account.balance}</p>
    </section>
  );
};

Account.propTypes = {
  account: PropTypes.object
};

export default Account;
