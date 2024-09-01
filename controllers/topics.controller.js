const User = require("../models/User");


const selectTopic = async (req, res) => {
    const { topics } = req.body;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }

        user.selectedTopics = topics;
        await user.save();

        res.status(200).json({ message: 'Topics updated successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { selectTopic };