import doFetch from './FetchService';

const crudFetch = (router, group, item, method, body, path) => {
    let url = `crud/${group}/${item}`;
    if (path) {
        url += `/${path}`;
    }
    return doFetch(router, url, method, body);
};

const postProcess = (data) => {
    let { cols, records } = data;
    for (let c of cols) {
        if (c.Type === 'Time') {
            for (let r of records) {
                r[c.Name] = new Date(r[c.Name]);
            }
        }
    }
    return records;
};

export default class CrudService {
    get(router, group, item) {
        return crudFetch(router, group, item).then((data) => {
            return postProcess(data);
        });
    }
    getMine(router, group, item) {
        return crudFetch(router, group, item, 'GET', null, 'mine').then((data) => {
            return postProcess(data);
        });
    }
    add(router, group, item, record) {
        return crudFetch(router, group, item, 'POST', JSON.stringify(record));
    }
    change(router, group, item, record) {
        return crudFetch(router, group, item, 'PUT', JSON.stringify(record));
    }
    delete(router, group, item, record) {
        return crudFetch(router, group, item, 'DELETE', JSON.stringify(record));
    }
    batchDelete(router, group, item, ids) {
        return crudFetch(router, group, item, 'DELETE', JSON.stringify(ids), 'batch');
    }
    exist(router, group, item, record) {
        return crudFetch(router, group, item, 'POST', JSON.stringify(record), 'exist');
    }
    perms(router, group, item) {
        return crudFetch(router, group, item, 'GET', null, 'perms');
    }
}
