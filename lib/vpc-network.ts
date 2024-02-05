import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Peer } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export class VpcNetwork extends Construct {
  public readonly vpc: ec2.IVpc;

  constructor(scope: Construct, id: string) {
      super(scope, id);

      // Create a VPC
      this.vpc = new ec2.Vpc(this, 'MyTestVpc', {
          maxAzs: 2, // Default is all AZs in region
          subnetConfiguration: [
              {
                  subnetType: ec2.SubnetType.PUBLIC,
                  name: 'PublicSubnet',
                  cidrMask: 24
              },
              {
                  subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                  name: 'PrivateSubnet',
                  cidrMask: 24
              }
          ],
          natGateways: 1 // Create a NAT gateway in the public subnet for internet access from private subnets
      });

      // Create a security group for allowing inbound traffic to the EC2 instances
      const ec2SecurityGroup = new ec2.SecurityGroup(this, 'EC2SecurityGroup', {
          vpc: this.vpc,
          description: 'Allow inbound traffic to EC2 instances',
          allowAllOutbound: true // Allow all outbound traffic
      });

      // Add ingress rule to allow traffic from the load balancer
      ec2SecurityGroup.addIngressRule(Peer.ipv4('168.0.0.0/0'), ec2.Port.tcp(80), 'Allow HTTP traffic');

      // Create an Application Load Balancer
      const loadBalancer = new elbv2.ApplicationLoadBalancer(this, 'MyLoadBalancer', {
          vpc: this.vpc,
          internetFacing: true // Set to true if you want the load balancer to be publicly accessible
      });

      // Add listener to load balancer
      const listener = loadBalancer.addListener('PublicListener', { port: 80 });

      // Create a target group
      const targetGroup = new elbv2.ApplicationTargetGroup(this, 'MyTargetGroup', {
          port: 80,
          targetType: elbv2.TargetType.INSTANCE,
          targets: [], // We will add targets dynamically
          vpc: this.vpc
      });

      // Add target group to the listener
      listener.addTargetGroups('TargetGroup', {
          targetGroups: [targetGroup]
      });

      // Export load balancer DNS name for external access
      new cdk.CfnOutput(this, 'LoadBalancerDNS', { value: loadBalancer.loadBalancerDnsName });
  }
}






// Simple VPC network configurations.

// export class VpcNetwork extends Construct {
//   public readonly vpc: ec2.IVpc;

//   constructor(scope: Construct, id: string) {
//     super(scope, id);

//     // Create a VPC
//     this.vpc = new ec2.Vpc(this, 'MyVpc', {
//       maxAzs: 2 // Default is all AZs in region
//     });

//     // Optionally, you can add more networking resources here, such as subnets, route tables, internet gateways, etc.
//   }
// }