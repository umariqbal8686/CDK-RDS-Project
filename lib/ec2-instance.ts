import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { InstanceTarget } from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export class Ec2Instance extends Construct {
    constructor(scope: Construct, id: string, vpc: ec2.IVpc, securityGroup: ec2.ISecurityGroup, keyPairName: string, targetGroup: elbv2.ApplicationTargetGroup) {
        super(scope, id);

        // Create an EC2 instance
        const instance = new ec2.Instance(this, 'MyEc2Instance', {
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
            machineImage: ec2.MachineImage.latestWindows(ec2.WindowsVersion.WINDOWS_SERVER_2019_ENGLISH_FULL_BASE),
            vpc,
            securityGroup,
            keyName: 'trial-key' // Use the provided key pair name for the EC2 instance
        });

        // Register the EC2 instance to the target group
        targetGroup.addTarget(new InstanceTarget(instance));

    }
}

