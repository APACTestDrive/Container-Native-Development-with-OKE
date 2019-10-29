# Putting It All Together - Continuous Integration and Delivery

![](images/500/header500.png)

## Introduction

This is the fifth and last of several labs that are part of the **Oracle Public Cloud Container Native Development workshop**. This workshop will walk you through the process of moving an existing application into a containerized CI/CD pipeline and deploying it to a Kubernetes cluster in the Oracle Public Cloud.

You will take on 2 personas during the workshop. The **Lead Developer Persona** will be responsible for configuring the parts of the automated build and deploy process that involve details about the application itself. The **DevOps Engineer Persona** will configure the parts of the automation involving the Kubernetes infrastructure. To containerize and automate the building and deploying of this application you will make use of Wercker Pipelines for CI/CD, Docker Hub for a Docker container registry, and Oracle Container Engine for Kubernetes (OKE) to provision a Kubernetes cluster on Oracle Cloud Infrastructure.

During this lab we will demonstrate the complete end-to-end of our CI/CD lifecycle by monitoring your application's source code repository for commits and automatically trigger a build and deploy of your Docker image to a Kubernetes cluster.

## Objectives

**Validate Your Continuous Integration and Delivery Pipelines**

- Test your deployed application
- Create database schema and poplulate with data
- Validate Pipelines Execution



## Validate Your Application Deployment

### **STEP 1**: Load your application

- From any browser, go to:

    [https://github.com/mcosbdemo/cndoke](https://github.com/mcosbdemo/cndoke)

- Click **Fork** in the upper right hand corner of the browser. **Sign in** if prompted.

  ![](images/400/1.png)


## Create Database Schema and Populate with Data





**You are now ready to move to the next lab: [Lab 500](LabGuide500.md)**
