var exec = require("child_process").exec;
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("gigadb", "root", "", {
  host: "localhost",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  dialectModule: require('mysql2'),
  logging: false
});

const tarx = sequelize.define(
  "pisos",
  {
    // Model attributes are defined here
    cmts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tarjeta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    piso: {
      type: DataTypes.REAL(2),
      allowNull: false,
      // allowNull defaults to true
    },
    hora: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
   
  },
  { 
    timestamps: false,
    updatedAt: false,
    // Other model options go here
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

var datos;

var trama = [];

function pideSnr() {
  try {
    exec(
    `plink.exe -ssh german@192.168.61.105 -pw "" -batch snr`,
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      datos = stdout.toString();

      let arr = datos.split("\n");
     
      var cmts = "c10";
      for (let index = 0; index < arr.length; index++) {
        if (index != 0 && index != arr.length - 1) {
          const element = arr[index];
          let cadena = element.trim();
          let tarjeta = cadena.substring(0, 9);
          let piso = cadena.slice(-4);
          tarjeta = tarjeta.trim();
          piso = piso.trim();
          piso = parseFloat(piso);
          const tar = { cmts, tarjeta, piso};
          trama.push(tar);
        }
        let arrFiltered = trama.filter((n) => n);

        tarx.bulkCreate(arrFiltered);

        arrFiltered = [];

        trama = [];
      }

      
    }
  );

  exec(
    `plink.exe -ssh german@192.168.61.103 -pw "" -batch snr`,
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      datos = stdout.toString();

      let arr = datos.split("\n");
     
      var cmts = "c100A";
      for (let index = 0; index < arr.length; index++) {
        if (index != 0 && index != arr.length - 1) {
          const element = arr[index];
          let cadena = element.trim();
          let tarjeta = cadena.substring(0, 9);
          let piso = cadena.slice(-4);
          tarjeta = tarjeta.trim();
          piso = piso.trim();
          piso = parseFloat(piso);
          const tar = { cmts, tarjeta, piso};
          
          trama.push(tar);
        }
        let arrFiltered = trama.filter((n) => n);

        tarx.bulkCreate(arrFiltered);

        
        arrFiltered = [];

        trama = [];
      }

      
    }
  );
  exec(
    `plink.exe -ssh german@192.168.61.107 -pw "" -batch snr`,
    async (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      datos = stdout.toString();

      let arr = datos.split("\n");
     
      var cmts = "c100B";
      for (let index = 0; index < arr.length; index++) {
        if (index != 0 && index != arr.length - 1) {
          const element = arr[index];
          let cadena = element.trim();
          let tarjeta = cadena.substring(0, 9);
          let piso = cadena.slice(-4);
          tarjeta = tarjeta.trim();
          piso = piso.trim();
          piso = parseFloat(piso);
          const tar = { cmts, tarjeta, piso};
         
          trama.push(tar);
        }
        let arrFiltered = trama.filter((n) => n);

        tarx.bulkCreate(arrFiltered);

        
        arrFiltered = [];

        trama = [];
      }

      
    }
  );
  } catch (error) {
    console.log(e);
  }
  
}

setInterval(pideSnr, 1000 * 60 * 30);
