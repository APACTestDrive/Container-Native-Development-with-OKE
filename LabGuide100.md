# Provision Kubernetes Using the OCI Console

![](images/100/header100.png)

## Introduction

This is the first of several labs that are part of the **Oracle Public Cloud Container Native Development workshop**. This workshop will walk you through the process of moving an existing application into a containerized CI/CD pipeline and deploying it to a Kubernetes cluster in the Oracle Public Cloud.

You will take on 2 personas during the workshop. The **Lead Developer Persona** will be responsible for configuring the parts of the automated build and deploy process that involve details about the application itself. The **DevOps Engineer Persona** will configure the cloud infrastructure, provision the Kubernetes cluster and Autonomous Database. To containerize and automate the building and deploying of this application you will make use of Wercker Pipelines for CI/CD, Docker Hub for a Docker container registry, and Oracle Container Engine for Kubernetes (OKE) to provision a Kubernetes cluster on Oracle Cloud Infrastructure.

During this lab, you will take on the **DevOps Engineer Persona**. You will provision a Kubernetes cluster and all of the infrastructure that it requires using the OCI console. OCI will provision the Virtual Cloud Network, Load Balancers, Kubernetes Master and Worker instances, and etcd instance required to support your cluster.



## Objectives

**Provision Oracle Container Engine for Kubernetes (OKE)**

- Create a Kubernetes Cluster
  - Set Up Oracle Cloud infrastructure
  - Provision Kubernetes Using the OCI Console
  - Create and upload API key for cluster management

## Required Artifacts

- The following lab requires an Oracle Public Cloud account. You may use your own cloud account, or a cloud account that you obtained through a trial.

# Provision Kubernetes Using the OCI Console

## Set Up Oracle Cloud Infrastructure

### **STEP 1**: Log in to your OCI Console

- You should have already acquired your Oracle Cloud Trial account before proceeding.

- From any browser go to:

    [https://console.us-ashburn-1.oraclecloud.com/#/a/](https://console.us-ashburn-1.oraclecloud.com/#/a/)

- Verify your cloud tenant

- Enter your **Username** and **Password** in the input fields and click **Sign In**. If you have a trial account, these can be found in your welcome email.

  ![](images/100/1.png)


### **STEP 2**: Create a Compartment for your Kubernetes nodes

Compartments are used to isolate resources within your OCI tenant. Role-based access policies can be applied to manage access to compute instances and other resources within a Compartment.

- Click the **hamburger icon** in the upper left corner to open the navigation menu. Under the **Identity** section of the menu, click **Compartments**

  ![](images/100/2.png)

  - If you have a **Demo** compartment already, _**SKIP THIS STEP**_. Otherwise, Click **Create Compartment**

    ![](images/100/3.png)

  - In the **Name** field, enter `Demo`. Enter a description of your choice. In the **Parent Compartment** field, ensure that the `root` compartment is selected (it will have the same name as your Oracle Cloud Account). Click **Create Compartment**.

    ![](images/100/4.png)

### **STEP 3**: Add a Policy Statement for OKE

  - Before the Oracle managed Kubernetes service can create compute instances in your OCI tenancy, we must explicitly give it permission to do so using a policy statement. From the OCI Console navigation menu, choose **Identity->Policies**.

    ![](images/100/5.png)

  - In the Compartment drop down menu on the left side, choose the **root compartment**. It will have the same name as your OCI tenancy (Cloud Account Name).

    ![](images/100/6.png)

  - Click **PSM-root-policy**

    ![](images/100/7.png)

  - Click the **Add Policy Statement** button

    ![](images/100/8.png)

  - In the Statement box, enter: `allow service OKE to manage all-resources in tenancy` and click **Add Statement**

    ![](images/100/9.png)


### **STEP 4**: Provision Kubernetes Using the OCI Console

  - Now we're ready to create our Kubernetes cluster. From the OCI Console navigation menu, select **Developer Services->Container Clusters (OKE)**.

    ![](images/100/10.png)

  - In the Compartments drop down, select the **Demo** compartment.

    ![](images/100/11.png)

  - Click **Create Cluster**

    ![](images/100/12.png)

  - We don't need to make any changes to the default values on this form, but let's look at what will be created when we submit it.

    ![](images/100/13.png)
    ![](images/100/14.png)

    - Starting at the top you'll notice that the cluster will be created in our **Demo** compartment.
    - We can customize the name of this cluster if we want
    - Multiple versions of Kubernetes are available, with the newest version selected by default
    - The default cluster creation mode will automatically create a Virtual Cloud Network for our cluster, including 2 load balancer subnets and 3 subnets for our worker VMs
    - We can customize the size and quantity of worker VMs in the node pool; by default we will get 3x 1 OCPU VMs, one in each Availability Domain.
    - Select **VM.Standard2.1** for the VM Shape from the **SHAPE** dropdown list if this is not the default.
    - We can also add more node pools to the cluster after creation.
    - The dashboard and Tiller will be installed by default.

  - Click **Create**. You will be brought to the cluster detail page. Your cluster will take a while to provision, so let's use this time to generate an API signing key pair to manage our cluster using the command line.



### **STEP 5**: Generate an API Signing Key Pair

  The following steps assumes you're using a Linux or MacOS system.

  Use OpenSSL commands to generate the key pair in the required PEM format.

  - If you haven't already, create a .oci directory to store the credentials:

    `mkdir ~/.oci`

  - Generate the private key with one of the following commands:

    `openssl genrsa -out ~/.oci/oci_api_key.pem -aes128 2048`

  - Ensure that only you can read the private key file:

    `chmod go-rwx ~/.oci/oci_api_key.pem`

  - Generate the public key:

    `openssl rsa -pubout -in ~/.oci/oci_api_key.pem -out ~/.oci/oci_api_key_public.pem`

  - Copy the contents of the public key to the clipboard using pbcopy, xclip or a similar tool (you'll need to paste the value into the Console later). For example:

    `cat ~/.oci/oci_api_key_public.pem | pbcopy`

  - Get the key's fingerprint with the following OpenSSL command:

    `openssl rsa -pubout -outform DER -in ~/.oci/oci_api_key.pem | openssl md5 -c`

    When you upload the public key in the Console, the fingerprint is also automatically displayed there. It looks something like this: `12:34:56:78:90:ab:cd:ef:12:34:56:78:90:ab:cd:ef`


### **STEP 6**: Upload the Public Key of the API Signing Key Pair

  You can now upload the PEM public key in the OCI Console.

  - In the Console, click on the **Profile** icon on the right hand corner and then select _your username_. The user details page is now shown.

  - Click **Add Public Key**

  - Paste the contents of the PEM public key in the dialog box and click **Add**

    You should see something similar to below with the key's fingerprint under the API Keys.

    ![](images/100/72.png)


### **STEP 7**: Verify Your Clusters

You should verify your cluster has been created successfully before moving on to Lab 200.

  - Click on your cluster name

  - Verify all the computer nodes in your node pool is in the active state.


**You are now ready to move to the next lab: [Lab 200](LabGuide200.md)**
