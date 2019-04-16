CREATE TABLE [dbo].[TblUser] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [FirstName]        NVARCHAR (50)  NULL,
    [LastName]         NVARCHAR (50)  NULL,
    [Contact]          NVARCHAR (20)  NULL,
    [Email]            NVARCHAR (30)  NULL,
    [Username]         NVARCHAR (30)  NULL,
    [DOB]              NVARCHAR (30)  NULL,
    [SecurityQuestion] NVARCHAR (800) NULL,
    [SecurityAnswer]   NVARCHAR (30)  NULL,
    [Password]         NVARCHAR (50)  NULL,
    [ConfirmPassword]  NVARCHAR (50)  NULL,
    [Company]          NVARCHAR (50)  NULL,
    [Role]             NVARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    UNIQUE NONCLUSTERED ([Username] ASC),
    UNIQUE NONCLUSTERED ([Email] ASC)
);

----------------------------------------------


CREATE TABLE [dbo].[TblCompany] (
    [CompanyId] INT            IDENTITY (1, 1) NOT NULL,
    [Name]      NVARCHAR (50)  NOT NULL,
    [Email]     NVARCHAR (30)  NULL,
    [Phone]     NVARCHAR (250) NULL,
    [Owner]     NVARCHAR (250) NULL,
    [Street]    NVARCHAR (250) NULL,
    [City]      NVARCHAR (250) NULL,
    [State]     NVARCHAR (250) NULL,
    [Country]   NVARCHAR (250) NULL,
    [DUNS]      NVARCHAR (9)   NULL,
    [Type]      NVARCHAR (250) NULL,
    PRIMARY KEY CLUSTERED ([CompanyId] ASC),
    UNIQUE NONCLUSTERED ([Name] ASC)
);

---------------------------------------------------

CREATE TABLE [dbo].[TblProduct] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [MaterialID]      NVARCHAR (40)  NULL,
    [Description]     NVARCHAR (250) NULL,
    [Price]           DECIMAL (7, 2) NULL,
    [Inventory]       INT            NULL,
    [SupplierCompany] NVARCHAR (250) NULL,
    [ImagePath]       NVARCHAR (250) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

-----------------------------------------------------

CREATE TABLE [dbo].[TblPO] (
    [Id]                       INT            IDENTITY (1, 1) NOT NULL,
    [PONumber]                 NVARCHAR (50)  NULL,
    [Buyer]                    NVARCHAR (250) NULL,
    [Supplier]                 NVARCHAR (250) NULL,
    [BuyerUserID]              NVARCHAR (250) NULL,
    [BuyerUserEmail]           NVARCHAR (30)  NULL,
    [PurchaseItemNameList]     NVARCHAR (250) NULL,
    [PurchaseItemquantityList] NVARCHAR (250) NULL,
    [PurchaseItempriceList]    NVARCHAR (250) NULL,
    [Totalamount]              REAL           NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

-----------------------------------------------------