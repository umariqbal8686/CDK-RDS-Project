import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VpcNetwork } from './vpc-network';
import { RdsInstance } from './rds-instance';
import { Ec2Instance } from './ec2-instance';
import { LoadBalancer } from './load-balancer';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';



export class CdkRdstestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC and associated networking resources
    const vpcConstruct = new VpcNetwork(this, 'MyTestVpc');

    // Create a security group for the RDS instances
    const securityGroup = new ec2.SecurityGroup(this, 'RdsSecurityGroup', {
      vpc: vpcConstruct.vpc
    });
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(1433), 'Allow inbound SQL Server access');

    // Create RDS instance
    new RdsInstance(this, 'MyRdsInstance', vpcConstruct.vpc, securityGroup);

    // Create a target group for the load balancer
    const targetGroup = new elbv2.ApplicationTargetGroup(this, 'MyTargetGroup', {
      port: 80,
      targetType: elbv2.TargetType.INSTANCE,
      targets: [], // Leave it empty for now
      vpc: vpcConstruct.vpc
    });

    // Create EC2 instance
    new Ec2Instance(this, 'MyEc2Instance', vpcConstruct.vpc, securityGroup, 'trial-key', targetGroup); // Use the provided key pair name for the EC2 instance

    // Create Load Balancer
    new LoadBalancer(this, 'MyLoadBalancer', vpcConstruct.vpc);
  }
}

const app = new cdk.App();
new CdkRdstestStack(app, 'CdkRdstestStack');
