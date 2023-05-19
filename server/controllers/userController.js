import User from '../models/User.js'

export const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id
        await User.updateOne(
            {
                _id: userId
            },
          {
            name: req.body.name,
            lastname: req.body.lastname, 
            email: req.body.email,
            phone: req.body.phone,
          }
        )
          .then(() => {
            res.status(200).send({ message: "Ваши данные были успешно обновлены." });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ message: "Ошибка обновления данных." });
          });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось обновить ваши данные" });
      }
}