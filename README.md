# Welcome to Umar RDS CDK TypeScript project

This stack is responsible for provisioning several AWS resources within an AWS account. Let's break down what resources will be built:

01. VPC and Associated Networking Resources:

The stack creates a Virtual Private Cloud (VPC) and associated networking resources like subnets, route tables, and internet gateways using the VpcNetwork construct.

02. Security Group for RDS Instances:

A security group is created to control inbound traffic to the RDS instances. It allows inbound SQL Server access on port 1433 from any IPv4 address.

03. RDS Instance:

An RDS instance is created using the RdsInstance construct. This RDS instance is deployed within the VPC created earlier and associated with the security group created for RDS instances.

04. Target Group for Load Balancer:

An Application Load Balancer target group is created to route traffic to EC2 instances. It's configured to listen on port 80 and target EC2 instances.

05. EC2 Instance:

An EC2 instance is created using the Ec2Instance construct. It's deployed within the VPC and associated with the security group created earlier. This instance also registers with the target group created for the load balancer.

06. Load Balancer:

A load balancer is created using the LoadBalancer construct. It's deployed within the VPC and configured to distribute incoming traffic across the EC2 instances.

07. CDK App and Stack Deployment:

Finally, the CDK app is instantiated, and the CdkRdstestStack stack is created and deployed using the CDK App construct.

Overall, this stack provisions networking infrastructure (VPC, subnets, etc.), RDS instances, EC2 instances, and a load balancer, enabling a scalable and fault-tolerant architecture for hosting applications within the AWS environment.