#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkRdstestStack } from '../lib/cdk-rdstest-stack';

const app = new cdk.App();
new CdkRdstestStack(app, 'CdkRdstestStack');