import { DataSource } from "typeorm";
import { LoggerUtil } from "../../utils/logger/Logger.util";

export async function bootDB(dataSource: DataSource): Promise<void> {
  dataSource
    .initialize()
    .then(async () => {
      LoggerUtil.info("Concexão com o banco estabelicida com sucesso");
    })
    .catch((error) =>
      LoggerUtil.error(
        `ERROR ao estabelecer conexão com Banco de dados: ${error}`
      )
    );
}
