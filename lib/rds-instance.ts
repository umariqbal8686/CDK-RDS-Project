import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import { RdsSecret } from './rds-secret';

export class RdsInstance extends Construct {
  constructor(scope: Construct, id: string, vpc: ec2.IVpc, securityGroup: ec2.ISecurityGroup) {
    super(scope, id);

    // Import the RDS secret
    const rdsSecret = new RdsSecret(this, 'RdsSecret');

    // Create an RDS instance
    new rds.DatabaseInstance(this, 'MySqlServerInstance', {
      engine: rds.DatabaseInstanceEngine.sqlServerSe({
        version: rds.SqlServerEngineVersion.VER_14
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.XLARGE), // Change the instance class to db.t3.xlarge
      vpc,
      securityGroups: [securityGroup],
      allocatedStorage: 20, // Storage size in GB
      storageType: rds.StorageType.GP2, // General Purpose SSD (default)
      deletionProtection: false, // Enable deletion protection
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Destroy the RDS instance if the stack is deleted
      autoMinorVersionUpgrade: true,
      // Use the secret for database credentials
      credentials: rds.Credentials.fromSecret(rdsSecret.secret),
      // Allocate a publicly accessible address
      publiclyAccessible: true,
      // Set the license model
      licenseModel: rds.LicenseModel.LICENSE_INCLUDED // Example license model
    });
  }
}




//     // Import the RDS secret. Use this menthod if you defining password in secret file.
//     const rdsSecret = new RdsSecret(this, 'RdsPassword');

//     // Create an RDS instance
//     new rds.DatabaseInstance(this, 'MySqlServerInstance', {
//       engine: rds.DatabaseInstanceEngine.sqlServerSe({
//         version: rds.SqlServerEngineVersion.VER_14
//       }),
//       instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
//       vpc,
//       securityGroups: [securityGroup],
//       allocatedStorage: 20, // Storage size in GB
//       storageType: rds.StorageType.GP2, // General Purpose SSD (default)
//       deletionProtection: false, // Enable deletion protection
//       removalPolicy: cdk.RemovalPolicy.DESTROY, // Destroy the RDS instance if the stack is deleted
//       autoMinorVersionUpgrade: true,
//       // Use the secret for database credentials
//       credentials: rds.Credentials.fromSecret(rdsSecret.secret),
//       // Allocate a publicly accessible address
//       publiclyAccessible: true
//     });
//   }
// }