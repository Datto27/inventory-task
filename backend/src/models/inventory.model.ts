import { Table, Model, Column, DataType } from "sequelize-typescript"


@Table({
  timestamps: true,
  tableName: "inventory"
})
export class Inventory extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  location!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false
  })
  price!: string;
}