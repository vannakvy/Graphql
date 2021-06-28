import {
    pick
} from 'lodash';

import {
    sign,
} from 'jsonwebtoken';

import {
    SECRET
} from '../config';

export const issueAuthToken = async (jwtPayload) => {
    console.log(jwtPayload)
    let token = await sign(jwtPayload, SECRET, {
        expiresIn: 3600*24
    });
    console.log(token)
    return `Bearer ${token}`;
};
export const serializeUser = user => pick(user, [
    'id',
    'email',
    'username',
    'lastName',
    'firstName',
    'roles'
]);