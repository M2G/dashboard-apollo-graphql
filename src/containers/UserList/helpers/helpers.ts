import { Buffer } from 'buffer';

function convertNodeToCursor(node: { _id: string }) {
  return Buffer.from(node._id, 'binary').toString('base64');
}

// @see https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb
function objectId(m = Math, d = Date, h = 16, s = (s: number) => m.floor(s).toString(h)) {
  return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
}

export {
  convertNodeToCursor,
  objectId,
};
