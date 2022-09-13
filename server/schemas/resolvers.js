const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        try {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
                return userData
            }
        } catch (err) {
            console.log(err)
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
          
          if (!user) {
            throw new AuthenticationError('No profile with this email found!');
          }

          const correctPw = await user.isCorrectPassword(password)

          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }

          const token = signToken(user);
          return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user)

            return { token, user };
        },
        saveBook: async (parent, { input }, context) => {
            try {
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        {
                            $push: { savedBooks: input }
                        },
                        {
                            new: true,
                            runValidators: true,
                        }
                    );
                    return updatedUser
                } 
            } catch (err) {
                console.log(err)
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers