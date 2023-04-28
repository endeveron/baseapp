import { InferSchemaType } from 'mongoose';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    account: {
      name: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        minlength: 6,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

type User = InferSchemaType<typeof userSchema>;
const UserModel = model<User>('User', userSchema);

export { UserModel, User };
