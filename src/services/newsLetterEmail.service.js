import NewsLetterEmail from "#models/newsLetterEmail";
import Service from "#services/base";
import { where } from "sequelize";

class NewsLetterEmailService extends Service {
  static Model = NewsLetterEmail;

  static async create(data) {
    const { email } = data;
    const existing = await this.Model.findOne({
      where: {
        email,
      },
    });

    if (existing) {
      existing.active = true;
      await existing.save();
    } else {
      await this.Model.create(data);
    }
  }

  static async update(id, data) {
    const existing = await this.Model.findById(id);
    existing.active = data.active;
    await existing.save();
  }
}

export default NewsLetterEmailService;
