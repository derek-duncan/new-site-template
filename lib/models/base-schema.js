import shortid from 'shortid';

const baseSchema = {
  _id: { type: String, default: shortid.generate },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
}
export default baseSchema;
