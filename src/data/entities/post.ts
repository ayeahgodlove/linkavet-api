import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import { IPost } from "../../domain/models/post";
import { User } from "./user";
import { Category } from "./category";
import { Comment } from "./comment";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "post",
  modelName: "Post",
})
export class Post extends Model<IPost> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  summary!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  imageUrl!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: true,
  })
  readTime!: string;

  @Column({
    type: DataType.DATE,
    // allowNull: false,
  })
  publishedAt!: Date;

  @ForeignKey(() => User) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  authorId!: string;

  @ForeignKey(() => Category) // foreign key
  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  categoryId!: string;

  @BelongsTo(() => User, "authorId")
  user!: User;

  @BelongsTo(() => Category, "categoryId")
  category!: Category;

  @HasMany(() => Comment)
  comments!: Comment[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  tags!: string[];

  // @BelongsToMany(() => Tag, () => PostTag, "postId", "tagId")
  // tags!: Tag[];
}
