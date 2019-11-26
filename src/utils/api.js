import request from '@/utils/request';

const req = request(wx);

const getJson = params => req.get({
    url: 'http://localhost:8000/test.json',
    params,
});

const uc = {
    signOut: params => req.get({
        url: 'http://localhost:8000/test.json',
        params,
    }),
};

export {
    getJson,
    uc,
};
