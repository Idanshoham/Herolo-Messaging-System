import React from 'react';

import requireAuth from '../HOCS/requireAuth';

const NewMessages = () => {
    return <div>STAMM</div>;
};

export default requireAuth(NewMessages);
