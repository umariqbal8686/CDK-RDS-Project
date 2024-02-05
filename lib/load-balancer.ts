import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';



export class LoadBalancer extends Construct {
  constructor(scope: Construct, id: string, vpc: ec2.IVpc) {
    super(scope, id);

    // Create an Application Load Balancer
    new elb.ApplicationLoadBalancer(this, 'MyLoadBalancer', {
      vpc,
      internetFacing: true
    });
  }
}
