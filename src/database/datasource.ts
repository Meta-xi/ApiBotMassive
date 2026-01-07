import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'postgres.railway.internal',
    port: 5432,
    username: 'postgres',
    password: 'HAReDFBiHZejjeePRYUPLkLIflYRmolU',
    database: 'railway',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false, // No activar sincronización automática en producción
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'], // Directorio de migraciones
});
