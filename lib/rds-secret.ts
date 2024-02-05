import { Construct } from 'constructs';
import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager';

export class RdsSecret extends Construct {
  public readonly secret: secretsManager.ISecret;

  constructor(scope: Construct, id: string) {
    super(scope, id);


    // Retrieve the secret from AWS Secrets Manager using its ARN or name
    this.secret = secretsManager.Secret.fromSecretNameV2(this, 'RdsSecret', 'sampledbMysqlCredentials');



//     // Define the secret value. Use this method in case you want to define plain text password in this secret file. 
//     // responsible for creating a secret in AWS Secrets Manager, which will store the password for the RDS (Relational Database Service) instance. 
//     const secretValue = cdk.SecretValue.plainText('MySecurePassword123');

//     // Create the secret
//     this.secret = new secretsManager.Secret(this, 'RdsPassword', {
//       secretName: 'MyRdsPassword',
//       generateSecretString: {
//         secretStringTemplate: JSON.stringify({ username: 'admin' }), // Optionally, you can include other parameters here
//         excludePunctuation: true,
//         passwordLength: 16
//       },
//       description: 'Database password for RDS instance'
//     });

//   }
// }


  }
}