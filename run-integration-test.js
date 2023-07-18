const { GenericContainer } = require("testcontainers");
const { spawn, execSync } = require("child_process");

const executeIntegrationTests = async () => {
  // Définir un conteneur Docker à partir de votre image Dockerfile
  const container = await new GenericContainer("kidmirror-api").start();

  try {
    // Exécutez les tests à l'aide de Jest
    const jestProcess = spawn("npx", ["jest", "open-cv"]);

    // Récupérez les logs de sortie du processus Jest
    jestProcess.stdout.on("data", (data) => {
      console.log(data.toString()); // Affiche la sortie standard de Jest
    });

    jestProcess.stderr.on("data", (data) => {
      console.error(data.toString()); // Affiche la sortie d'erreur de Jest
    });

    // Attendez que le processus Jest se termine
    await new Promise((resolve, reject) => {
      jestProcess.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Les tests ont échoué avec le code ${code}`));
        }
      });
    });
  } finally {
    // Arrêter et supprimer le conteneur après avoir terminé les tests
    await container.stop();
  }
};

const executeIntegrationTestsInDockerImage = () => {
  try {
    // Exécutez les commandes à l'intérieur du conteneur Docker et capturez les logs de sortie
    const output = execSync(
      "docker run --rm kidmirror-api npx jest fluent-ffmpeg-video.provider",
      {
        stdio: ["inherit", "pipe", "pipe"],
        encoding: "utf-8",
      }
    );

    console.log(output); // Affiche les logs de sortie
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

executeIntegrationTestsInDockerImage();

// executeIntegrationTests().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
