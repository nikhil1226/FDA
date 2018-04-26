
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users_roles]') AND type in (N'U'))
DROP TABLE [dbo].[users_roles]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sites]') AND type in (N'U'))
DROP TABLE [dbo].[sites]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[schedules_products]') AND type in (N'U'))
DROP TABLE [dbo].[schedules_products]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[schedules_metrics]') AND type in (N'U'))
DROP TABLE [dbo].[schedules_metrics]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[roles]') AND type in (N'U'))
DROP TABLE [dbo].[roles]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[products_comments_history]') AND type in (N'U'))
DROP TABLE [dbo].[products_comments_history]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[products]') AND type in (N'U'))
DROP TABLE [dbo].[products]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[metrics]') AND type in (N'U'))
DROP TABLE [dbo].[metrics]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[audit]') AND type in (N'U'))
DROP TABLE [dbo].[audit]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_COM_FDA_SiteMaster]') AND type in (N'U'))
DROP TABLE [dbo].[T_COM_FDA_SiteMaster]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_COM_KPIMaster]') AND type in (N'U'))
DROP TABLE [dbo].[T_COM_KPIMaster]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_COM_MaterialMaster]') AND type in (N'U'))
DROP TABLE [dbo].[T_COM_MaterialMaster]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_LKP_SitePlantMaintenance]') AND type in (N'U'))
DROP TABLE [dbo].[T_LKP_SitePlantMaintenance]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_RolePermissionRelation]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_RolePermissionRelation]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_RoleMaster]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_RoleMaster]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_ApplicationObjects]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_ApplicationObjects]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_ApplicationHeader]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_ApplicationHeader]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_UserGroup]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_UserGroup]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_AuthorizationMaster]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_AuthorizationMaster]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_Group]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_Group]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_Permissions]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_Permissions]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_AccessRequestHeader]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_AccessRequestHeader]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_SYS_UM_User]') AND type in (N'U'))
DROP TABLE [dbo].[T_SYS_UM_User]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_COM_StatusMaster]') AND type in (N'U'))
DROP TABLE [dbo].[T_COM_StatusMaster]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_FQM_KPI1MetricDetails]') AND type in (N'U'))
DROP TABLE [dbo].[T_FQM_KPI1MetricDetails]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_FQM_ScheduleDetail]') AND type in (N'U'))
DROP TABLE [dbo].[T_FQM_ScheduleDetail]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_FQM_ScheduleHeader]') AND type in (N'U'))
DROP TABLE [dbo].[T_FQM_ScheduleHeader]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_FQM_ScheduleScopeDefinition]') AND type in (N'U'))
DROP TABLE [dbo].[T_FQM_ScheduleScopeDefinition]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_FQM_UploadHeader]') AND type in (N'U'))
DROP TABLE [dbo].[T_FQM_UploadHeader]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_FQM_workflowHistory]') AND type in (N'U'))
DROP TABLE [dbo].[T_FQM_workflowHistory]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_TMP_FQM_KPI1MetricDetails]') AND type in (N'U'))
DROP TABLE [dbo].[T_TMP_FQM_KPI1MetricDetails]

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[T_TMP_MD_UPL_SitePlantMaintenance]') AND type in (N'U'))
DROP TABLE [dbo].[T_TMP_MD_UPL_SitePlantMaintenance]

/****** DROP STORE PROCEDURE ******/


IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_COM_Get_Global_UploadApprover')
DROP PROCEDURE SP_COM_Get_Global_UploadApprover
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_COM_GetAll_ApplicationObjects')
DROP PROCEDURE SP_COM_GetAll_ApplicationObjects
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_COM_GetAllApplicationHeader')
DROP PROCEDURE SP_COM_GetAllApplicationHeader
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_COM_GetAllKPIMaster')
DROP PROCEDURE SP_COM_GetAllKPIMaster
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_COM_GetUploadObjectMaster')
DROP PROCEDURE SP_COM_GetUploadObjectMaster
GO


IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_COM_GetUploadSiteApprover')
DROP PROCEDURE SP_COM_GetUploadSiteApprover
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_COM_Update_Active_Status_Metric_Data')
DROP PROCEDURE SP_COM_Update_Active_Status_Metric_Data
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_Add_DIM_UploadHeader')
DROP PROCEDURE SP_LKP_Add_DIM_UploadHeader
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_DIM_GetAll_DIM_UploadHeaders_ByRole')
DROP PROCEDURE SP_LKP_DIM_GetAll_DIM_UploadHeaders_ByRole
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_DIM_GetAllUploadHeaders')
DROP PROCEDURE SP_LKP_DIM_GetAllUploadHeaders
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_DIM_UploadHeader_WorkFlow')
DROP PROCEDURE SP_LKP_DIM_UploadHeader_WorkFlow
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_GetAll_DIM_UploadHeadersByID')
DROP PROCEDURE SP_LKP_GetAll_DIM_UploadHeadersByID
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_GetAllSites')
DROP PROCEDURE SP_LKP_GetAllSites
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_Remove_TMP_MD_SitePlantMaintenance')
DROP PROCEDURE SP_LKP_Remove_TMP_MD_SitePlantMaintenance
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_TMP_Remove_SI03A_IPCStabilityTests')
DROP PROCEDURE SP_LKP_TMP_Remove_SI03A_IPCStabilityTests
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_TMP_Update_SI03A_IPCStabilityTests')
DROP PROCEDURE SP_LKP_TMP_Update_SI03A_IPCStabilityTests
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_Update_DIM_UploadHeaders_ByID')
DROP PROCEDURE SP_LKP_Update_DIM_UploadHeaders_ByID
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_Update_DIM_UploadMetricStatus')
DROP PROCEDURE SP_LKP_Update_DIM_UploadMetricStatus
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SP_LKP_Update_TMP_MD_SitePlantMaintenance')
DROP PROCEDURE SP_LKP_Update_TMP_MD_SitePlantMaintenance
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SpComGET_GetAllSite')
DROP PROCEDURE SpComGET_GetAllSite
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SpComGET_GetProducts')
DROP PROCEDURE SpComGET_GetProducts
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SpComGET_Schedule')
DROP PROCEDURE SpComGET_Schedule
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'SpComSAVE_CreateSchedule')
DROP PROCEDURE SpComSAVE_CreateSchedule
GO

/****** Object:  TableType ******/
IF not EXISTS (SELECT * FROM sys.types WHERE is_user_defined = 1 AND name = 'idType')
DROP TYPE uploadMetricActions;

GO
/****** Object:  Table [dbo].[audit]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[audit](
	[schedule_id] [int] IDENTITY(1,1) NOT NULL,
	[site_id] [varchar](50) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[metrics] [varchar](50) NULL,
	[site_plan_coordinator] [varchar](50) NULL,
	[site_plan_reviewer] [varchar](50) NULL,
	[status] [int] NULL,
	[created_by] [varchar](50) NULL,
	[created_date] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[updated_date] [datetime] NULL,
PRIMARY KEY CLUSTERED
(
	[schedule_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[metrics]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[metrics](
	[metric_id] [int] IDENTITY(1,1) NOT NULL,
	[site_id] [int] NULL,
	[metric_name] [varchar](500) NULL,
 CONSTRAINT [PK_metrics] PRIMARY KEY CLUSTERED
(
	[metric_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[products]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[products](
	[product_pk] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NULL,
	[sub_product_id] [int] NULL,
	[product_name] [varchar](150) NULL,
	[legal_name] [varchar](50) NULL,
	[brand_name] [varchar](50) NULL,
	[local_dosage_form] [varchar](50) NULL,
	[dosage_strength] [int] NULL,
	[strength_unit] [varchar](50) NULL,
	[product_ndc] [varchar](50) NULL,
	[application_number] [varchar](50) NULL,
	[type] [varchar](50) NULL,
	[bu] [varchar](50) NULL,
PRIMARY KEY CLUSTERED
(
	[product_pk] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[products_comments_history]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[products_comments_history](
	[c_id] [int] IDENTITY(1,1) NOT NULL,
	[schedule_id] [int] NULL,
	[product_id] [int] NULL,
	[sub_product_id] [int] NULL,
	[comments] [varchar](50) NULL,
	[excluded] [varchar](50) NULL,
	[created_by] [varchar](50) NULL,
	[created_date] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[updated_date] [datetime] NULL,
PRIMARY KEY CLUSTERED
(
	[c_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[roles]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[roles](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [varchar](500) NULL,
 CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[schedules_metrics]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[schedules_metrics](
	[schedule_metric_id] [int] IDENTITY(1,1) NOT NULL,
	[metric_id] [int] NULL,
	[schedule_id] [int] NULL,
 CONSTRAINT [PK_schedules_metrics] PRIMARY KEY CLUSTERED
(
	[schedule_metric_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[schedules_products]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[schedules_products](
	[schedule_id] [int] NULL,
	[product_id] [int] NULL,
	[sub_product_id] [int] NULL,
	[include_flag] [int] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[sites]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[sites](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[bu] [varchar](50) NULL,
	[site] [varchar](50) NULL,
	[plant_code] [varchar](50) NULL,
	[fei_number] [varchar](50) NULL,
	[duns_number] [varchar](50) NULL,
	[production] [varchar](100) NULL,
	[profit_center] [varchar](50) NULL,
	[site_name] [varchar](150) NULL,
	[site_address] [varchar](150) NULL,
PRIMARY KEY CLUSTERED
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_COM_FDA_SiteMaster]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_COM_FDA_SiteMaster](
	[NQCId] [nvarchar](50) NULL,
	[Country] [nvarchar](5) NULL,
	[Entity] [nvarchar](100) NULL,
	[HRId] [nvarchar](20) NULL,
	[BPCId] [nvarchar](20) NULL,
	[Id2016] [nvarchar](50) NULL,
	[NQCFlag] [nvarchar](10) NULL,
	[Region] [nvarchar](100) NULL,
	[Technology] [nvarchar](100) NULL,
	[Alcon] [nvarchar](10) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_COM_KPIMaster]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_COM_KPIMaster](
	[KPIRecordID] [bigint] IDENTITY(1,1) NOT NULL,
	[KPIName] [nvarchar](100) NULL,
 CONSTRAINT [PK_T_COM_KPIMaster] PRIMARY KEY CLUSTERED
(
	[KPIRecordID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_COM_MaterialMaster]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_COM_MaterialMaster](
	[MaterialRecordId] [nvarchar](100) NULL,
	[SourceSystem] [nvarchar](2) NULL,
	[Material] [nvarchar](18) NULL,
	[Plant] [nvarchar](4) NULL,
	[MaterialType] [nvarchar](4) NULL,
	[EANUPC] [nvarchar](30) NULL,
	[EANUPCType] [nvarchar](4) NULL,
	[Brand] [nvarchar](18) NULL,
	[PackageSize] [decimal](17, 0) NULL,
	[MaterialDescription] [nvarchar](150) NULL,
	[ProdSched] [nvarchar](10) NULL,
	[ProfitCTR] [nvarchar](10) NULL,
	[Product] [nvarchar](50) NULL,
	[ProductDescription] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_COM_StatusMaster]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_COM_StatusMaster](
	[StatusRecordID] [bigint] IDENTITY(1,1) NOT NULL,
	[StatusName] [nvarchar](100) NULL,
 CONSTRAINT [PK_T_COM_StatusMaster] PRIMARY KEY CLUSTERED
(
	[StatusRecordID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_FQM_ScheduleDetail]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_FQM_ScheduleDetail](
	[ScheduleRecordId] [nvarchar](100) NOT NULL,
	[SiteRecordId] [nvarchar](100) NOT NULL,
	[ProductNdcFda] [nvarchar](20) NOT NULL,
	[ProcessingPlant] [nvarchar](20) NULL,
	[IsValid] [nvarchar](10) NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedOn] [date] NULL,
	[LabelerName] [nvarchar](150) NULL,
	[ProductTypeName] [nvarchar](150) NULL,
	[ProprietaryName] [nvarchar](150) NULL,
	[ActiveNumeratorStrength] [nvarchar](20) NULL,
	[ActiveIngredUnit] [nvarchar](20) NULL,
	[ApplicationNumber] [nvarchar](20) NULL,
 CONSTRAINT [ScheduleDetail_PK] PRIMARY KEY CLUSTERED
(
	[ScheduleRecordId] ASC,
	[SiteRecordId] ASC,
	[ProductNdcFda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_FQM_ScheduleHeader]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_FQM_ScheduleHeader](
	[ScheduleRecordId] [bigint] IDENTITY(1,1) NOT NULL,
	[SiteRecordId] [nvarchar](100) NOT NULL,
	[SiteName] [nvarchar](100) NOT NULL,
	[ScheduleDescription] [nvarchar](100) NULL,
	[ScheduleStartDate] [date] NOT NULL,
	[ScheduleEndDate] [date] NOT NULL,
	[KPIRecordId] [nvarchar](20) NOT NULL,
	[SitePlanCoordinator] [nvarchar](50) NULL,
	[SitePlanReviewer] [nvarchar](50) NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedOn] [date] NULL,
	[UpdateBy] [nvarchar](50) NULL,
	[UpdatedOn] [date] NULL,
	[StatusId] [nvarchar](20) NULL,
 CONSTRAINT [ScheduleHeader_PK] PRIMARY KEY CLUSTERED
(
	[ScheduleRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_FQM_ScheduleScopeDefinition]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_FQM_ScheduleScopeDefinition](
	[ScheduleRecordId] [nvarchar](100) NOT NULL,
	[SiteRecordId] [nvarchar](100) NOT NULL,
	[MaterialRecordId] [nvarchar](100) NULL,
	[ProductNdcFda] [nvarchar](20) NOT NULL,
	[ProcessingPlant] [nvarchar](20) NULL,
	[IsValid] [nvarchar](10) NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedOn] [date] NULL,
	[LabelerName] [nvarchar](150) NULL,
	[ProductTypeName] [nvarchar](150) NULL,
	[ProprietaryName] [nvarchar](150) NULL,
	[ActiveNumeratorStrength] [nvarchar](20) NULL,
	[ActiveIngredUnit] [nvarchar](20) NULL,
	[ApplicationNumber] [nvarchar](20) NULL,
 CONSTRAINT [ScheduleScopeDefinition_PK] PRIMARY KEY CLUSTERED
(
	[ScheduleRecordId] ASC,
	[SiteRecordId] ASC,
	[ProductNdcFda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_FQM_UploadHeader]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_FQM_UploadHeader](
	[UploadRecordId] [bigint] IDENTITY(1,1) NOT NULL,
	[SiteRecordId] [nvarchar](100) NULL,
	[SiteName] [nvarchar](100) NULL,
	[UploadDescription] [nvarchar](100) NULL,
	[UploadStartDate] [date] NULL,
	[UploadEndDate] [date] NULL,
	[KPIRecordId] [nvarchar](100) NULL,
	[UploadReviewer] [nvarchar](100) NULL,
	[CreatedBy] [nvarchar](100) NULL,
	[CreatedOn] [date] NULL,
	[UpdateBy] [nvarchar](100) NULL,
	[UpdatedOn] [date] NULL,
	[WFStatusId] [nvarchar](50) NULL,
	[UploadTemplateRecordId] [nvarchar](20) NULL,
 CONSTRAINT [UploadHeader_PK] PRIMARY KEY CLUSTERED
(
	[UploadRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_FQM_KPI1MetricDetails]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_FQM_KPI1MetricDetails](
	[UploadMetricDetailsRecordId] [bigint] IDENTITY(1,1) NOT NULL,
	[UploadRecordId] [bigint] NOT NULL,
	[KPIRecordId] [nvarchar](20) NOT NULL,
	[IsValid] [nvarchar](10) NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedOn] [date] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedOn] [date] NULL,
	[KPIValue1] [nvarchar](150) NULL,
	[KPIValue2] [nvarchar](150) NULL,
	[KPIValue3] [nvarchar](150) NULL,
	[KPIValue4] [nvarchar](150) NULL,
	[KPIValue5] [nvarchar](150) NULL,
	[KPIValue6] [nvarchar](150) NULL,
	[KPIValue7] [nvarchar](150) NULL,
	[KPIValue8] [nvarchar](150) NULL,
	[KPIValue9] [nvarchar](150) NULL,
	[KPIValue10] [nvarchar](150) NULL,
	[KPIValue11] [nvarchar](150) NULL,
	[KPIValue12] [nvarchar](150) NULL,
	[KPIValue13] [nvarchar](150) NULL,
	[KPIValue14] [nvarchar](150) NULL,
	[KPIValue15] [nvarchar](150) NULL,
	[KPIValue16] [nvarchar](150) NULL,
	[KPIValue17] [nvarchar](150) NULL,
	[MetricActiveStatusId] [nvarchar](50) NULL,
 CONSTRAINT [PK_T_FQM_KPI1MetricDetails] PRIMARY KEY CLUSTERED
(
	[UploadMetricDetailsRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_FQM_workflowHistory]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_FQM_workflowHistory](
[WorkFlowRecordId] [bigint] IDENTITY(1,1) NOT NULL,
[entity] [nvarchar](150) NULL,
[entity_id] [bigint] NULL,
[WFStatusId] [bigint] NULL,
[comments] [nvarchar](150) NULL,
[createdBy] [nvarchar](150) NULL,
[createdOn] [date] NULL,
CONSTRAINT [PK_T_FQM_workflowHistory] PRIMARY KEY CLUSTERED
(
[WorkFlowRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_LKP_SitePlantMaintenance]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_LKP_SitePlantMaintenance](
	[SiteRecordId] [nvarchar](50) NULL,
	[Plant] [nvarchar](10) NULL,
	[NQCId] [nvarchar](50) NULL,
	[ResponsibleSite1] [nvarchar](150) NULL,
	[ResponsibleSite2] [nvarchar](5) NULL,
	[FEI] [nvarchar](100) NULL,
	[DUNS] [nvarchar](100) NULL,
	[FDA] [nvarchar](20) NULL,
	[Country] [nvarchar](5) NULL,
	[Entity] [nvarchar](100) NULL,
	[Region] [nvarchar](100) NULL,
	[Technology] [nvarchar](100) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_SYS_UM_AccessRequestHeader]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_AccessRequestHeader](
	[UserAccessRequestId] [int] NOT NULL,
	[System] [varchar](50) NOT NULL,
	[UserId] [varchar](8) NOT NULL,
	[CreatedBy] [varchar](8) NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [AccessRequest_PK] PRIMARY KEY CLUSTERED
(
	[UserAccessRequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_ApplicationHeader]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_ApplicationHeader](
	[ApplicationId] [int] NOT NULL,
	[ApplicationName] [varchar](100) NOT NULL,
	[IsGlobal] [varchar](2) NULL,
	[UseADGroup] [varchar](2) NULL,
	[IsActive] [varchar](10) NULL,
	[CreatedBy] [varchar](8) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
	[ValidFrom] [date] NULL,
	[ValidTo] [date] NULL,
 CONSTRAINT [Application_PK] PRIMARY KEY CLUSTERED
(
	[ApplicationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_ApplicationObjects]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_ApplicationObjects](
	[AppObjectId] [int] NOT NULL,
	[AppObjectName] [varchar](100) NOT NULL,
	[ApplicationRecordId] [int] NOT NULL,
	[ValidFrom] [date] NOT NULL,
	[ValidTo] [date] NULL,
	[IsActive] [bit] NULL DEFAULT ((1)),
	[CreatedBy] [varchar](8) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [ApplicationObjects_PK] PRIMARY KEY CLUSTERED
(
	[AppObjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_AuthorizationMaster]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_AuthorizationMaster](
	[UserAccessRequestId] [int] NOT NULL,
	[UserId] [varchar](8) NOT NULL,
	[UserGroupId] [int] NOT NULL,
	[ApprovedBy] [varchar](8) NULL,
	[ApprovedOn] [date] NULL,
	[ValidFrom] [date] NOT NULL,
	[ValidTo] [date] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [varchar](100) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [Authorization_PK] PRIMARY KEY CLUSTERED
(
	[UserAccessRequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_Group]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_Group](
	[GroupId] [int] NOT NULL,
	[GroupName] [varchar](50) NOT NULL,
 CONSTRAINT [GROUP_PK] PRIMARY KEY CLUSTERED
(
	[GroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_Permissions]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_Permissions](
	[PermissionObjectId] [int] NOT NULL,
	[PermObjectName] [varchar](100) NOT NULL,
	[CreatedBy] [varchar](8) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ValidFrom] [date] NOT NULL,
	[ValidTo] [date] NULL,
	[IsActive] [bit] NULL DEFAULT ((1)),
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [Permissions_PK] PRIMARY KEY CLUSTERED
(
	[PermissionObjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_RoleMaster]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_RoleMaster](
	[RoleId] [int] NOT NULL,
	[RoleName] [varchar](100) NOT NULL,
	[ApplicationRecordId] [int] NOT NULL,
	[CreatedBy] [varchar](8) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ValidFrom] [date] NOT NULL,
	[ValidTo] [date] NULL,
	[IsGlobal] [bit] NULL DEFAULT ((1)),
	[IsActive] [bit] NULL DEFAULT ((1)),
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [RoleMaster_PK] PRIMARY KEY CLUSTERED
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_RolePermissionRelation]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_RolePermissionRelation](
	[RoleID] [int] NOT NULL,
	[RoleName] [varchar](100) NULL,
	[ObjectID] [int] NOT NULL,
	[AppObjectName] [varchar](100) NULL,
	[PermissionID] [int] NOT NULL,
	[PermObjectName] [varchar](100) NULL,
	[IsActive] [bit] NULL DEFAULT ((1)),
	[ValidFrom] [date] NOT NULL,
	[ValidTo] [date] NULL,
	[CreatedBy] [varchar](8) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [RolePermissions_PK] PRIMARY KEY CLUSTERED
(
	[RoleID] ASC,
	[ObjectID] ASC,
	[PermissionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_User]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_User](
	[UserId] [varchar](8) NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[LastName] [varchar](100) NULL,
	[Designation] [varchar](100) NULL,
	[Organization] [varchar](100) NULL,
	[ManagerId] [varchar](100) NULL,
	[ManagerName] [varchar](150) NULL,
	[IsGDDB] [char](2) NOT NULL,
	[EmailId] [varchar](200) NULL,
	[CEGStatus] [varchar](50) NULL,
	[HRStatus] [varchar](50) NULL,
	[IsValid] [bit] NULL DEFAULT ((1)),
	[CreatedBy] [varchar](8) NOT NULL,
	[CreatedOn] [datetime] NOT NULL CONSTRAINT [DF_T_SYS_UM_User_CreatedOn]  DEFAULT (getdate()),
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [User_PK] PRIMARY KEY CLUSTERED
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[T_SYS_UM_UserGroup]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[T_SYS_UM_UserGroup](
	[UserId] [varchar](8) NOT NULL,
	[UserGroupId] [int] NOT NULL,
	[System] [varchar](50) NOT NULL,
	[ObjectValue] [varchar](300) NULL,
	[PrimaryOwner] [varchar](50) NULL,
	[PrimaryApprover] [varchar](50) NULL,
	[DeputyApprover] [varchar](50) NULL,
	[CreatedBy] [varchar](100) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[ValidFrom] [date] NOT NULL,
	[ValidTo] [date] NULL,
	[IsGlobal] [varchar](10) NULL,
	[IsActive] [bit] NULL DEFAULT ((1)),
	[UpdatedBy] [varchar](8) NULL,
	[UpdatedOn] [datetime] NULL,
 CONSTRAINT [UserGroup_PK] PRIMARY KEY CLUSTERED
(
	[UserId] ASC,
	[UserGroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[users_roles]    Script Date: 06-07-2017 14:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[users_roles](
	[user_role_id] [int] IDENTITY(1,1) NOT NULL,
	[user_name] [varchar](500) NULL,
	[role_id] [int] NULL,
	[site_id] [int] NULL,
	[user_id] [int] NULL,
 CONSTRAINT [PK_users_roles] PRIMARY KEY CLUSTERED
(
	[user_role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO

/****** Object:  Table [dbo].[T_TMP_FQM_KPI1MetricDetails]    Script Date: 26-07-2017 19:52:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[T_TMP_FQM_KPI1MetricDetails](
  [UploadMetricDetailsRecordId] [bigint] IDENTITY(1,1) NOT NULL,
  [UploadRecordId] [bigint] NOT NULL,
  [KPIRecordId] [nvarchar](20) NOT NULL,
  [IsValid] [nvarchar](10) NULL,
  [CreatedBy] [nvarchar](50) NULL,
  [CreatedOn] [date] NULL,
  [UpdatedBy] [nvarchar](50) NULL,
  [UpdatedOn] [date] NULL,
  [KPIValue1] [nvarchar](150) NULL,
  [KPIValue2] [nvarchar](150) NULL,
  [KPIValue3] [nvarchar](150) NULL,
  [KPIValue4] [nvarchar](150) NULL,
  [KPIValue5] [nvarchar](150) NULL,
  [KPIValue6] [nvarchar](150) NULL,
  [KPIValue7] [nvarchar](150) NULL,
  [KPIValue8] [nvarchar](150) NULL,
  [KPIValue9] [nvarchar](150) NULL,
  [KPIValue10] [nvarchar](150) NULL,
  [KPIValue11] [nvarchar](150) NULL,
  [KPIValue12] [nvarchar](150) NULL,
  [KPIValue13] [nvarchar](150) NULL,
  [KPIValue14] [nvarchar](150) NULL,
  [KPIValue15] [nvarchar](150) NULL,
  [KPIValue16] [nvarchar](150) NULL,
  [KPIValue17] [nvarchar](150) NULL,
  [MetricActiveStatusId] [nvarchar](50) NULL,
 CONSTRAINT [PK_T_TMP_FQM_KPI1MetricDetails] PRIMARY KEY CLUSTERED
(
  [UploadMetricDetailsRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[T_TMP_MD_UPL_SitePlantMaintenance]    Script Date: 26-07-2017 19:58:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[T_TMP_MD_UPL_SitePlantMaintenance](
  [UploadDataRecordId] [nvarchar](100) NOT NULL,
  [SiteRecordId] [nvarchar](50) NULL,
  [Plant] [nvarchar](10) NULL,
  [NQCId] [nvarchar](50) NULL,
  [Country] [nvarchar](5) NULL,
  [Entity] [nvarchar](100) NULL,
  [Region] [nvarchar](100) NULL,
  [Technology] [nvarchar](100) NULL,
  [ResponsibleSite1] [nvarchar](150) NULL,
  [ResponsibleSite2] [nvarchar](150) NULL,
  [FEI] [nvarchar](100) NULL,
  [DUNS] [nvarchar](100) NULL,
  [FDA] [nvarchar](20) NULL,
  [NQC_FLAG] [nvarchar](10) NULL,
  [HR_ID] [nvarchar](20) NULL,
  [HR_ID2] [nvarchar](20) NULL,
  [BPC_ID2] [nvarchar](20) NULL,
  [PACKAGER1] [nvarchar](100) NULL,
  [PACKAGER2] [nvarchar](100) NULL,
  [BPC_ID] [nvarchar](20) NULL,
  [ALCON_FLAG] [nvarchar](10) NULL,
  [UploadedOn] [date] NULL,
  [ChangedOn] [date] NULL,
  [UploadFlag] [nvarchar](10) NULL,
  [UploadRecordId] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED
(
  [UploadDataRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[metrics] ON

GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (1, 1, N'Lots Started')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (2, 1, N'Lots Released')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (3, 1, N'Lots Rejected')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (4, 1, N'Number of release and stability tests')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (5, 1, N'OOS Results')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (6, 1, N'OOS Invalidated')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (7, 1, N'Product Quality Complaints')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (8, 1, N'Number of dosage units distributed')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (9, 2, N'Lots Started')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (10, 2, N'Lots Released')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (11, 2, N'Lots Rejected')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (12, 2, N'Number of release and stability tests')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (13, 2, N'OOS Results')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (14, 2, N'OOS Invalidated')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (15, 2, N'Product Quality Complaints')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (16, 2, N'Number of dosage units distributed')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (17, 3, N'Lots Released')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (18, 3, N'Lots Rejected')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (19, 3, N'Number of release and stability tests')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (20, 3, N'OOS Results')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (21, 3, N'OOS Invalidated')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (22, 3, N'Product Quality Complaints')
GO
INSERT [dbo].[metrics] ([metric_id], [site_id], [metric_name]) VALUES (23, 3, N'Number of dosage units distributed')
GO
SET IDENTITY_INSERT [dbo].[metrics] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON

GO
INSERT [dbo].[products] ([product_pk], [product_id], [sub_product_id], [product_name], [legal_name], [brand_name], [local_dosage_form], [dosage_strength], [strength_unit], [product_ndc], [application_number], [type], [bu]) VALUES (1, 1, 1, N'Diovan Film-coated tabled 100 mg, United States', N'Diovan(R) - valsartan tablets', N'Dovan', N'Film-coated tablet', 100, N'mg', N'0078-0360', N'NDA021283', N'DP', N'PH')
GO
INSERT [dbo].[products] ([product_pk], [product_id], [sub_product_id], [product_name], [legal_name], [brand_name], [local_dosage_form], [dosage_strength], [strength_unit], [product_ndc], [application_number], [type], [bu]) VALUES (2, 2, 1, N'Film-coated tabled 500 mg, United States', N'valsartan tablets', N'Dovan', N'Film-coated tablet', 500, N'mg', N'1078-0360', N'NDA022283', N'DP', N'PH')
GO
INSERT [dbo].[products] ([product_pk], [product_id], [sub_product_id], [product_name], [legal_name], [brand_name], [local_dosage_form], [dosage_strength], [strength_unit], [product_ndc], [application_number], [type], [bu]) VALUES (3, 2, 2, N'DovanFilm-coated tabled 10 mg, United States', N'valsartan tablets', N'Dovan', N'Film-coated tablet', 10, N'mg', N'1078-0360', N'NDA022283', N'DP', N'PH')
GO
INSERT [dbo].[products] ([product_pk], [product_id], [sub_product_id], [product_name], [legal_name], [brand_name], [local_dosage_form], [dosage_strength], [strength_unit], [product_ndc], [application_number], [type], [bu]) VALUES (4, 1, 2, N'Diovan Film-coated tabled 320 mg, United States', N'Diovan(R) - valsartan tablets', N'Dovan', N'Film-coated tablet', 320, N'mg', N'0078-0360', N'NDA021283', N'DP', N'PH')
GO
INSERT [dbo].[products] ([product_pk], [product_id], [sub_product_id], [product_name], [legal_name], [brand_name], [local_dosage_form], [dosage_strength], [strength_unit], [product_ndc], [application_number], [type], [bu]) VALUES (5, 2, 3, N'Film-coated tabled 320 mg, United States', N'valsartan tablets', N'Dovan', N'Film-coated tablet', 320, N'mg', N'1078-0360', N'NDA022283', N'DP', N'PH')
GO
INSERT [dbo].[products] ([product_pk], [product_id], [sub_product_id], [product_name], [legal_name], [brand_name], [local_dosage_form], [dosage_strength], [strength_unit], [product_ndc], [application_number], [type], [bu]) VALUES (6, 2, 4, N'DovanFilm-coated tabled 100 mg, Europe', N'valsartan tablets', N'Dovan', N'Film-coated tablet', 100, N'mg', N'1078-0360', N'NDA022283', N'DP', N'PH')
GO
SET IDENTITY_INSERT [dbo].[products] OFF
GO
SET IDENTITY_INSERT [dbo].[roles] ON

GO
INSERT [dbo].[roles] ([role_id], [role_name]) VALUES (1, N'Global Site Coordinator')
GO
INSERT [dbo].[roles] ([role_id], [role_name]) VALUES (2, N'Site Coordinator')
GO
INSERT [dbo].[roles] ([role_id], [role_name]) VALUES (3, N'Site Reviewer')
GO
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
SET IDENTITY_INSERT [dbo].[sites] ON

GO
INSERT [dbo].[sites] ([id], [bu], [site], [plant_code], [fei_number], [duns_number], [production], [profit_center], [site_name], [site_address]) VALUES (1, N'PH', N'CH,Stein Solids', N'CH12', N'3002653483', N'488152505', N'CH1 + CH3 + CH7', N'', N'Novartis Pharma Stein AG', N'Schaffhauserstrasse, 4332 Stein, Switzerland')
GO
INSERT [dbo].[sites] ([id], [bu], [site], [plant_code], [fei_number], [duns_number], [production], [profit_center], [site_name], [site_address]) VALUES (2, N'PH', N'CH,Stein Steriles', N'CH12', N'3002653483', N'488152505', N'CH2 + CH4 + CH6', N'', N'Novartis Pharma Stein AG', N'Schaffhauserstrasse, 4332 Stein, Switzerland')
GO
INSERT [dbo].[sites] ([id], [bu], [site], [plant_code], [fei_number], [duns_number], [production], [profit_center], [site_name], [site_address]) VALUES (3, N'PH', N'GB, Grimsby', N'GB43', N'10656', N'212245609', N'CH2 + CH4 + CH6', N'', N'Novartis Grimsby Limited', N'Pyewipe, Grimsby, North-East Lincolnshire Dn 31 2sr, United Kingdom')
GO
SET IDENTITY_INSERT [dbo].[sites] OFF
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100170', N'US', N'US, San Carlos', N'2458', N'PLT11001', N' ', N'M', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100040', N'ES', N'ES, Barbera', N'2466', N'PLT11002', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100060', N'IT', N'IT, Torre', N'2467', N'PLT11003', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO110010', N'CH', N'CH, Stein Solids', N'2469', N'PLT11004', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100020', N'DE', N'DE, Wehr', N'2468', N'PLT11006', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100120', N'EG', N'EG, Cairo', N'2475', N'PLT11008', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100070', N'TR', N'TR, Kurtkoy', N'2471', N'PLT11009', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100110', N'CN', N'CN, Beijing', N'2479', N'PLT11010', N' ', N'M', N'Asia Pacific', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100090', N'JP', N'JP, Sasayama', N'2482', N'PLT11011', N' ', N'M', N'Asia Pacific', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100140', N'SG', N'SG; Singapore', N'2485', N'PLT11012', N' ', N'M', N'Asia Pacific', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDDS000020', N'FR', N'FR, Huningue', N' ', N'PLT11014', N' ', N'M', N'DS1', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOBO100010', N'FR', N'FR, Huningue', NULL, N'PLT11014', N'PHBDDS000020', N'M', N'DS1', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDDS000010', N'SG', N'SG; Singapore', N' ', N'PLT11015', N' ', N'M', N'DS1', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDDS000070', N'DE', N'DE, Marburg', N'790', N'PLT11019', N' ', N'M', N'DS1', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDDS000030', N'AT', N'AT, DS-Schaftenau', N'1051', N'PLT11020', N' ', N'M', N'DS1', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDDS000050', N'SI', N'SI, Menges BIO', N'1052', N'PLT11021', N' ', N'M', N'DS2', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO110020', N'CH', N'CH, Stein Steriles', N'2546', N'PLT11034', N' ', N'M', N'DP', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDDP000010', N'AT', N'AT, DP-Schaftenau', N'1051', N'PLT11035', N' ', N'M', N'DP', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOCO000070', N'CN', N'CN, Changshu', N'2418', N'PLT11052', N' ', N'M', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOCO000020', N'GB', N'GB, Grimsby', N'2420', N'PLT11053', N' ', N'M', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOCO000060', N'IE', N'IE, NIPBI', NULL, N'PLT11054', N' ', N'T', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOCO000030', N'IE', N'IE, Ringaskiddy', N'2423', N'PLT11055', N' ', N'M', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOCO000010', N'CH', N'CH, Basel', N'2424', N'PLT11056', N' ', N'M', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000020', N'CN', N'CN, Zhongshan', NULL, N'PLT11058', N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000250', N'EG', N'EG, Cairo', NULL, N'PLT11059', N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000025', N'EG', N'EG, Cairo', NULL, N'PLT11059', N'SZTPCT000250', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000070', N'IN', N'IN, Mahad', NULL, N'PLT11061', N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOES000010', N'XY', N'ESO Americas', NULL, N'PLT11067', N' ', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTPTO000020', N'US', N'BE, Puurs', NULL, N'PLT11157', N' ', N'E', N'AL ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTPTO000040', N'US', N'QAES (FTW)', NULL, N'PLT11158', N' ', N'E', N'AL ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDTD000050', N'CH', N'CH, TD-Stein', NULL, N'PLT11168', N' ', N'T', N'CGT', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOBO100050', N'US', N'US, Morris-Plains C&GT', NULL, N'PLT11169', N'PHTOBO010070', N'M', N'CGT', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOBO010070', N'US', N'US, Morris-Plains C&GT', NULL, N'PLT11169', NULL, N'M', N'CGT', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTONA000020', N'US', N'US, Broomfield', N'2452', N'PLT14001', N' ', N'M', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTONA000050', N'BR', N'BR, Cambe', N'2457', N'PLT14002', N' ', N'M', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTONA000060', N'MX', N'MX, Mexico-Candelaria', N'2456', N'PLT14003', N' ', N'M', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTONA000040', N'US', N'US, Melville', N'2455', N'PLT14004', N' ', N'M', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOSS000010', N'DE', N'DE, Holzkirchen', N'2460', N'PLT14005', N' ', N'M', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOSS000020', N'DE', N'DE, Rudolstadt', N'2459', N'PLT14006', N' ', N'M', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTONA000030', N'US', N'US, Wilson', N'2454', N'PLT14007', N' ', N'M', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM000060', N'DE', N'DE, Barleben', N'2461', N'PLT14009', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000020', N'DE', N'DE, Barleben', N'2461', N'PLT14009', N'SZTOEM000060', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM000070', N'DE', N'DE, Gerlingen', N'2463', N'PLT14011', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000030', N'DE', N'DE, Gerlingen', N'2463', N'PLT14011', N'SZTOEM000070', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES010080', N'SI', N'SI, Lendava Solids', N'2465', N'PLT14012', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000080', N'SI', N'SI, Lendava Solids', N'2465', N'PLT14012', N'SZTOES010080', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES010070', N'SI', N'SI, Ljubljana Solids', N'2464', N'PLT14013', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000070', N'SI', N'SI, Ljubljana Solids', N'2464', N'PLT14013', N'SZTOES010070', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES010040', N'PL', N'PL, Strykow', N'1036', N'PLT14015', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000040', N'PL', N'PL, Strykow', N'1036', N'PLT14015', N'SZTOES010040', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES010050', N'PL', N'PL, Warsaw', N'2462', N'PLT14017', N' ', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000050', N'PL', N'PL, Warsaw', N'2462', N'PLT14017', N'SZTOES010050', N'M', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM010010', N'DZ', N'DZ, Algiers', N'2474', N'PLT14018', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM000010', N'DZ', N'DZ, Algiers', N'2474', N'PLT14018', N'SZTOEM010010', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM010020', N'TR', N'TR, Gebze 1', N'2472', N'PLT14019', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM000020', N'TR', N'TR, Gebze 1', N'2472', N'PLT14019', N'SZTOEM010020', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM010030', N'TR', N'TR, Gebze 2', N'2473', N'PLT14020', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM000030', N'TR', N'TR, Gebze 2', N'2473', N'PLT14020', N'SZTOEM010030', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000120', N'IN', N'IN, Kalwe', N'2477', N'PLT14021', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000130', N'RU', N'RU, St. Petersburg', N'2470', N'PLT14022', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM010050', N'ZA', N'ZA, Spartan', N'2476', N'PLT14023', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOEM000050', N'ZA', N'ZA, Spartan', N'2476', N'PLT14023', N'SZTOEM010050', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES010060', N'RO', N'RO, Targu Mures', N'2478', N'PLT14024', N' ', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000060', N'RO', N'RO, Targu Mures', N'2478', N'PLT14024', N'SZTOES010060', N'M', N'Eastern Europe & Africa', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOAP000020', N'CN', N'CN, Zhongshan', N'2480', N'PLT14025', N' ', N'M', N'Asia Pacific', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOAP000060', N'JP', N'JP, Kaminoyama', N'2481', N'PLT14026', N' ', N'M', N'Asia Pacific', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOAP000030', N'ID', N'ID, Jakarta', N'2484', N'PLT14028', N' ', N'M', N'Asia Pacific', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOAP000010', N'BD', N'BD, Tongi', N'2483', N'PLT14030', N' ', N'M', N'Asia Pacific', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOSS000040', N'AT', N'AT, Kundl FDF', N'2428', N'PLT14031', N' ', N'M', NULL, N'Anti-Infectives', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZAAAA000010', N'AT', N'AT, Kundl API', N'2430', N'PLT14032', N' ', N'M', NULL, N'Anti-Infectives', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZAAAA000080', N'SI', N'SI, Lendava API', N'2434', N'PLT14033', N' ', N'M', NULL, N'Anti-Infectives', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZAAAA000030', N'ES', N'ES, Les Franqueses', N'2432', N'PLT14034', N' ', N'M', NULL, N'Anti-Infectives', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES010090', N'SI', N'SI, Prevalje', N'2435', N'PLT14035', N' ', N'M', NULL, N'Anti-Infectives', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOES000090', N'SI', N'SI, Prevalje', N'2435', N'PLT14035', N'SZTOES010090', N'M', N' ', N'Anti-Infectives', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZAAAA000070', N'IT', N'IT, Rovereto', N'2433', N'PLT14036', N' ', N'M', NULL, N'Anti-Infectives', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOSS000050', N'CA', N'CA, Boucherville', N'2443', N'PLT14039', N' ', N'M', NULL, N'Aseptics', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOSS000030', N'SI', N'SI, Ljubljana Steriles', N'2440', N'PLT14041', N' ', N'M', NULL, N'Aseptics', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOSS000060', N'AT', N'AT, Unterach', N'2444', N'PLT14042', N' ', N'M', NULL, N'Aseptics', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZAAAA000050', N'IN', N'IN, Mahad', N'2421', N'PLT14043', N' ', N'M', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZAAAA000090', N'SI', N'SI, Menges API', N'2422', N'PLT14044', N' ', N'M', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZAAAA000100', N'TR', N'TR, Tuzla', N'2425', N'PLT14045', N' ', N'M', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCA000010', N'CA', N'CA, Boucherville TechOps', NULL, N'PLT14046', N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000080', N'IN', N'IN, Turbhe AI', NULL, N'PLT14047', N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPBO000010', N'AT', N'AT, Kundl BOI', NULL, N'PLT14048', N' ', N'E', N'BioPH/OncoInj.', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZBOBO000010', N'AT', N'AT, Kundl BOI', NULL, N'PLT14048', N'SZTPBO000010', N'E', N'BioPH/OncoInj.', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZBOBO000040', N'AT', N'AT, Kundl BOI', NULL, N'PLT14048', N'SZTPBO000010', N'E', N'BioPH/OncoInj.', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPBO000030', N'SI', N'SI, Menges BOI', NULL, N'PLT14049', N' ', N'E', N'BioPH/OncoInj.', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZBOBO000020', N'SI', N'SI, Menges BOI', NULL, N'PLT14049', N'SZTPBO000030', N'E', N'BioPH/OncoInj.', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM010010', N'DE', N'DE, Barleben Magdeburg', NULL, N'PLT14051', N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000010', N'DE', N'DE, Barleben Magdeburg', NULL, N'PLT14051', N'SZTPWM010010', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPBO000020', N'AT', N'AT, Unterach', NULL, N'PLT14053', N' ', N'E', N'BioPH/OncoInj.', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZBOBO000030', N'AT', N'AT, Unterach', NULL, N'PLT14053', N'SZTPBO000020', N'E', N'BioPH/OncoInj.', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPUS000040', N'US', N'US, ESO', NULL, N'PLT14054', N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDDS000040', N'AT', N'AT, Kundl BIO', N'1050', N'PLT14057', N' ', N'M', N'DS2', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZAAAA000040', N'ES', N'ES, Palafolis', N'2431', N'PLT14058', N' ', N'M', NULL, N'Anti-Infectives', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOPO000010', N'ES', N'ES, Barcelona', N'2441', N'PLT71001', N' ', N'M', NULL, N'Aseptics', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOPO000030', N'US', N'US, Fort Worth ASPEX', N'2438', N'PLT71003', N' ', N'M', NULL, N'Aseptics', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOPO000070', N'BE', N'BE, Puurs Steriles', N'2442', N'PLT71004', N' ', N'M', NULL, N'Aseptics', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOPO000080', N'BR', N'BR, Sao Paulo', N'2445', N'PLT71005', N' ', N'M', NULL, N'Aseptics', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOPO000090', N'SG', N'SG, Singapore', N'2446', N'PLT71006', N' ', N'M', NULL, N'Aseptics', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTO00000000', N'  ', N'Alcon TechOps', NULL, NULL, NULL, N'T', NULL, N'Central', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCP00000000', N'  ', N'Global CPO', NULL, NULL, NULL, N'C', N'Global CPO', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRD00000010', N'  ', N'Pharma Development Virtual', NULL, NULL, NULL, N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAMEC0080', N'AE', N'Gulf/UAE', NULL, NULL, N' ', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000420', N'AL', N'Albania', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTONA000070', N'AR', N'AR, Olivos, B.A', NULL, NULL, N' ', N'T', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOSA000010', N'AR', N'AR, Olivos, B.A.', NULL, NULL, N' ', N'C', N'NA/LATAM', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPLA000030', N'AR', N'AR, Olivos, B.A.', NULL, NULL, N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000090', N'AR', N'Argentina Cluster', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000080', N'AT', N'AT, Kundl FDF', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000080', N'AT', N'AT, Kundl FDF', NULL, NULL, N'SZTPWM000080', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZRDDC000010', N'AT', N'AT, Kundl, AI', NULL, NULL, N' ', N'D', N'SZ Small Molecule Dev', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000150', N'AT', N'AT, Kundl, AI', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000150', N'AT', N'AT, Kundl, AI', NULL, NULL, N'SZTPWM000150', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZRDDC000020', N'AT', N'AT, Kundl, FDF', NULL, NULL, N' ', N'D', N'SZ Small Molecule Dev', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDTD000010', N'AT', N'AT, TD-Schaftenau', NULL, NULL, N' ', N'T', N'TD', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZRDDC000030', N'AT', N'AT, Unterach', NULL, NULL, N' ', N'D', N'SZ Small Molecule Dev', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCO002090', N'AT', N'AT, Vienna', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000140', N'AT', N'AT,Vienna', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000140', N'AT', N'AT,Vienna', NULL, NULL, N'SZTPWM000140', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000210', N'AT', N'Austria', NULL, NULL, N' ', N'C', N'West Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOAP000010', N'AU', N'AU, Pyrmont', NULL, NULL, N' ', N'C', N'APAC', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000090', N'AU', N'AU, Pyrmont', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000160', N'BD', N'Bangladesh', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000010', N'BD', N'BD, Tongi', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000010', N'BD', N'BE, Vilvoorde', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000210', N'BE', N'BE, Vilvoorde', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000210', N'BE', N'BE, Vilvoorde', NULL, NULL, N'SZTPWM000210', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000020', N'BE', N'Belgium', NULL, NULL, N' ', N'C', N'West Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000220', N'BG', N'Bulgaria', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPLA000010', N'BR', N'BR, Cambe', NULL, NULL, N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100190', N'BR', N'BR, Import Testing Brazil', NULL, NULL, N' ', N'T', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOCO000080', N'BR', N'BR, Stability Brazil', NULL, NULL, N' ', N'T', NULL, N'ChemOps', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000010', N'BR', N'Brazil', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCONA000020', N'CA', N'CA, Boucherville', NULL, NULL, N' ', N'C', N'NA/LATAM', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZRDDC000040', N'CA', N'CA, Boucherville', NULL, NULL, N' ', N'D', N'SZ Small Molecule Dev', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCA000020', N'CA', N'CA, Boucherville ComOps', NULL, NULL, N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000020', N'CA', N'Canada', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000010', N'CH', N'CH, Basel', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000020', N'CH', N'CH, Cham', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000220', N'CH', N'CH, Cham', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000220', N'CH', N'CH, Cham', NULL, NULL, N'SZTPWM000220', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDDS000060', N'CH', N'CH, DS Basel', NULL, NULL, N' ', N'T', N'DS2', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOBO100040', N'CH', N'CH, DS Basel', NULL, NULL, N'PHBDDS000060', N'T', N'DS2', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDTD000040', N'CH', N'CH, TD-Basel', NULL, NULL, N' ', N'T', N'TD', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000350', N'CH', N'Switzerland', NULL, NULL, N' ', N'C', N'West Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000030', N'CL', N'Chile', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPCN000010', N'CN', N'China', NULL, NULL, N' ', N'C', N'China', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000040', N'CN', N'CN, Changshu', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOAP000020', N'CN', N'CN, Shanghai', NULL, NULL, N' ', N'C', N'APAC', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000100', N'CN', N'CN, Shanghai', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000040', N'CO', N'Colombia', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000310', N'CS', N'Serbia', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000240', N'CY', N'Cyprus', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000010', N'CZ', N'CZ, Praha', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000080', N'CZ', N'CZ, Praha', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000080', N'CZ', N'CZ, Praha', NULL, NULL, N'SZTPCT000080', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000250', N'CZ', N'Czech Republic', NULL, NULL, N' ', N'C', N'East Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000020', N'DE', N'DE, Gerlingen', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000020', N'DE', N'DE, Gerlingen', NULL, NULL, N'SZTPWM000020', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCODE000010', N'DE', N'DE, Holzkirchen', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZRDDC000050', N'DE', N'DE, Holzkirchen', NULL, NULL, N' ', N'D', N'SZ Small Molecule Dev', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000300', N'DE', N'DE, Holzkirchen', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000300', N'DE', N'DE, Holzkirchen', NULL, NULL, N'SZTPWM000300', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000060', N'DE', N'DE, Holzkirchen TechOps', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000060', N'DE', N'DE, Holzkirchen TechOps', NULL, NULL, N'SZTPWM000060', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCODE000020', N'DE', N'DE, Oberhaching', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZRDDC000060', N'DE', N'DE, Rudolstadt', NULL, NULL, N' ', N'D', N'SZ Small Molecule Dev', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000070', N'DE', N'DE, Rudolstadt', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000070', N'DE', N'DE, Rudolstadt', NULL, NULL, N'SZTPWM000070', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000060', N'DE', N'Germany', NULL, NULL, N' ', N'C', N'Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZ0000000010', N'DE', N'Sandoz Division', NULL, NULL, NULL, N'T', NULL, N'Central', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000030', N'DK', N'Denmark', NULL, NULL, N' ', N'C', N'Nordics', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000030', N'DK', N'DK, Copenhagen', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000230', N'DK', N'DK, Copenhagen', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000230', N'DK', N'DK, Copenhagen', NULL, NULL, N'SZTPWM000230', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000010', N'DZ', N'Algeria', NULL, NULL, N' ', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000220', N'DZ', N'DZ, Algier', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000090', N'DZ', N'DZ, Algier', NULL, NULL, N'SZTPCT000220', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000050', N'EC', N'Ecuador', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCO004120', N'EG', N'EG, Egypt', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000040', N'EG', N'Egypt', NULL, NULL, N' ', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000170', N'ES', N'ES, Les Franqueses', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000170', N'ES', N'ES, Les Franqueses', NULL, NULL, N'SZTPWM000170', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000040', N'ES', N'ES, Madrid', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000240', N'ES', N'ES, Madrid', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000240', N'ES', N'ES, Madrid', NULL, NULL, N'SZTPWM000240', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000180', N'ES', N'ES, Palafolls', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000180', N'ES', N'ES, Palafolls', NULL, NULL, N'SZTPWM000180', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000340', N'ES', N'Spain', NULL, NULL, N' ', N'C', N'Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000040', N'FI', N'Finland', NULL, NULL, N' ', N'C', N'Nordics', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000050', N'FR', N'FR, Levallois-Perret', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000250', N'FR', N'FR, Levallois-Perret', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000250', N'FR', N'FR, Levallois-Perret', NULL, NULL, N'SZTPWM000250', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000050', N'FR', N'France', NULL, NULL, N' ', N'C', N'Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000060', N'GB', N'GB, Frimley/Camberley', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000260', N'GB', N'GB, Frimley/Camberley', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000260', N'GB', N'GB, Frimley/Camberley', NULL, NULL, N'SZTPWM000260', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000120', N'GB', N'GB, Kent', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000140', N'GB', N'United Kingdom', NULL, NULL, N' ', N'C', N'Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000070', N'GR', N'Greece', NULL, NULL, N' ', N'C', N'West Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPCN000020', N'HK', N'Hong Kong', NULL, NULL, N' ', N'C', N'China', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000230', N'HR', N'Croatia', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000020', N'HR', N'HR, Zagreb', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000090', N'HR', N'HR, Zagreb', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000090', N'HR', N'HR, Zagreb', NULL, NULL, N'SZTPCT000090', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000030', N'HU', N'HU, Budapest', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000100', N'HU', N'HU, Budapest', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000100', N'HU', N'HU, Budapest', NULL, NULL, N'SZTPCT000100', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000260', N'HU', N'Hungary', NULL, NULL, N' ', N'C', N'East Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000030', N'ID', N'ID, Jakarta', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000210', N'ID', N'Indonesia', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000070', N'IE', N'IE, Cork', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000080', N'IE', N'Ireland', NULL, NULL, N' ', N'C', N'Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000050', N'IL', N'Israel', NULL, NULL, N' ', N'C', N'East Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000100', N'IN', N'IN, Hyderabad Genome Valley', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000090', N'IN', N'IN, Hyderabad NKC', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000040', N'IN', N'IN, Kalwe', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTOAP000040', N'IN', N'IN, Kalwe', NULL, NULL, N'SZTPAP000040', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOAP000030', N'IN', N'IN, Thane', NULL, NULL, N' ', N'C', N'APAC', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000110', N'IN', N'IN, Thane', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000030', N'IN', N'India', NULL, NULL, N' ', N'C', N'AMAC', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000080', N'IT', N'IT, Origgio', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000280', N'IT', N'IT, Origgio', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000280', N'IT', N'IT, Origgio', NULL, NULL, N'SZTPWM000280', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000190', N'IT', N'IT, Rovereto', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000190', N'IT', N'IT, Rovereto', NULL, NULL, N'SZTPWM000190', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000270', N'IT', N'Italy', NULL, NULL, N' ', N'C', N'Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO300000', N'IT', N'Pharmanalytica (Locarno)', NULL, NULL, N' ', N'T', N'Europe', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCP00000020', N'JP', N'Japan', NULL, NULL, N' ', N'C', N'Global CPO', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000060', N'JP', N'JP, Kaminoyama', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000060', N'JP', N'JP, Tokyo', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOAP000040', N'JP', N'JP, Tokyo', NULL, NULL, N' ', N'C', N'APAC', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000120', N'JP', N'JP, Tokyo', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOAP000050', N'KR', N'KR, Seoul', NULL, NULL, N' ', N'C', N'APAC', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000130', N'KR', N'KR, Seoul', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000080', N'MA', N'Morocco', NULL, NULL, N' ', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000040', N'MC', N'MC, Skopje', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000110', N'MC', N'MC, Skopje', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000110', N'MC', N'MC, Skopje', NULL, NULL, N'SZTPCT000110', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000280', N'MT', N'Malta', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000060', N'MX', N'Mexico', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPLA000020', N'MX', N'MX, Mexico', NULL, NULL, N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000220', N'MY', N'Malaysia', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000090', N'NL', N'Netherlands', NULL, NULL, N' ', N'C', N'West Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000090', N'NL', N'NL, Almere', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000290', N'NL', N'NL, Almere', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000290', N'NL', N'NL, Almere', NULL, NULL, N'SZTPWM000290', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000100', N'NO', N'Norway', NULL, NULL, N' ', N'C', N'Nordics', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000070', N'PE', N'Peru', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOAP000060', N'PH', N'PH, Manila', NULL, NULL, N' ', N'C', N'APAC', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000140', N'PH', N'PH, Manila', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000230', N'PK', N'Pakistan', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000160', N'PL', N'PL, Strykow', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000030', N'PL', N'PL, Strykow', NULL, NULL, N'SZTPCT000160', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000050', N'PL', N'PL, Warszawa', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000120', N'PL', N'PL, Warszawa', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000040', N'PL', N'PL, Warszawa', NULL, NULL, N'SZTPCT000120', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000110', N'PL', N'Poland', NULL, NULL, N' ', N'C', N'East Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000120', N'PT', N'Portugal', NULL, NULL, N' ', N'C', N'West Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOWM000100', N'PT', N'PT, Sintra', NULL, NULL, N' ', N'C', N'WE', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000320', N'PT', N'PT, Sintra', NULL, NULL, N' ', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000320', N'PT', N'PT, Sintra', NULL, NULL, N'SZTPWM000320', N'E', N'WE/MEA', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000060', N'RO', N'RO, Bucarest', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000130', N'RO', N'RO, Bucarest', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000130', N'RO', N'RO, Bucarest', NULL, NULL, N'SZTPCT000130', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000170', N'RO', N'RO, Targu Mures', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000050', N'RO', N'RO, Targu Mures', NULL, NULL, N'SZTPCT000170', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000290', N'RO', N'Romania', NULL, NULL, N' ', N'C', N'East Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000070', N'RU', N'RU, Moscow', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000140', N'RU', N'RU, Moscow', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000140', N'RU', N'RU, Moscow', NULL, NULL, N'SZTPCT000140', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000300', N'RU', N'Russia', NULL, NULL, N' ', N'C', N'Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAMEC0070', N'SA', N'Saudi Arabia', NULL, NULL, N' ', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000130', N'SE', N'Sweden', NULL, NULL, N' ', N'C', N'Nordics', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOAP000070', N'SG', N'SG, Singapore', NULL, NULL, N' ', N'C', N'APAC', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000150', N'SG', N'SG, Singapore', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000250', N'SG', N'Singapore', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000020', N'SI', N'SI, Lendava', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000020', N'SI', N'SI, Lendava', NULL, NULL, N'SZTPCT000020', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000060', N'SI', N'SI, Lendava, A', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000060', N'SI', N'SI, Lendava, A', NULL, NULL, N'SZTPCT000060', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000080', N'SI', N'SI, Ljubljana', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000100', N'SI', N'SI, Ljubljana', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000150', N'SI', N'SI, Ljubljana', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000150', N'SI', N'SI, Ljubljana', NULL, NULL, N'SZTPCT000150', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000010', N'SI', N'SI, Ljubljana - Solids', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000040', N'SI', N'SI, Ljubljana - Steriles', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000040', N'SI', N'SI, Ljubljana - Steriles', NULL, NULL, N'SZTPCT000040', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZRDDC000080', N'SI', N'SI, Ljubljana, FDF', NULL, NULL, N' ', N'D', N'SZ Small Molecule Dev', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZRDDC000090', N'SI', N'SI, Menges, API', NULL, NULL, N' ', N'D', N'SZ Small Molecule Dev', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000070', N'SI', N'SI, Menges, API', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000070', N'SI', N'SI, Menges, API', NULL, NULL, N'SZTPCT000070', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000030', N'SI', N'SI, Prevalje', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000030', N'SI', N'SI, Prevalje', NULL, NULL, N'SZTPCT000030', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPBO000040', N'SI', N'SI, Schaftenau BP', NULL, NULL, N' ', N'E', N'BioPH/OncoInj.', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDTD000030', N'SI', N'SI, TD-Menges', NULL, NULL, N' ', N'T', N'TD', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000330', N'SI', N'Slovenia', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCE000010', N'Si', N'SI, Ljubljana - Solids', NULL, NULL, N'SZTPCT000010', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000320', N'SK', N'Slovakia', NULL, NULL, N' ', N'C', N'East Europe', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000100', N'TN', N'Tunisia', NULL, NULL, N' ', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000180', N'TR', N'TR, Gebze I', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000100', N'TR', N'TR, Gebze I', NULL, NULL, N'SZTPCT000180', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000190', N'TR', N'TR, Gebze II', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000110', N'TR', N'TR, Gebze II', NULL, NULL, N'SZTPCT000190', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000200', N'TR', N'TR, Tuzla', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWE000200', N'TR', N'TR, Tuzla', NULL, NULL, N'SZTPCT000200', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000110', N'TR', N'Turkey', NULL, NULL, N' ', N'C', N'AMAC', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000260', N'TW', N'Taiwan', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOCF000090', N'UA', N'UA, Kiew', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000210', N'UA', N'UA, Kiew', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000360', N'UA', N'Ukraine', NULL, NULL, N'PHCPEU000430', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTPTO000010', N'US', N'ES, Barcelona', NULL, NULL, N' ', N'E', N'AL ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPUS000010', N'US', N'US, Broomfield', NULL, NULL, N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000020', N'US', N'US, East Hanover', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPUS000020', N'US', N'US, Melville', NULL, NULL, N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCONA000010', N'US', N'US, Princeton', NULL, NULL, N' ', N'C', N'NA/LATAM', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000030', N'US', N'US, San Carlos', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOPO100180', N'US', N'US, Stability US', NULL, NULL, N' ', N'T', N'Americas & Specials', N'Solids', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPUS000030', N'US', N'US, Wilson', NULL, NULL, N' ', N'E', N'Americas', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCP00000030', N'US', N'USA', NULL, NULL, N' ', N'C', N'Global CPO', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000080', N'VE', N'Venezuela', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000280', N'VN', N'Vietnam', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPAP000160', N'VN', N'VN, Ho-Chi-Minh-City', NULL, NULL, N' ', N'E', N'APac', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZCOAP000080', N'VN', N'VN, Ho-Chi-Minh City', NULL, NULL, N' ', N'C', N'APAC', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDES000010', N'XY', N'DP-ESO BTDM', NULL, NULL, N' ', N'T', N'ESO', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDES000020', N'XY', N'DS-ESO BTDM', NULL, NULL, N' ', N'T', N'ESO', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOTP000010', N'XY', N'ESO Americas', NULL, NULL, N'PHTOES000010', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOES000030', N'XY', N'ESO APAC & Middle East', NULL, NULL, N' ', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOTP000030', N'XY', N'ESO APAC & Middle East', NULL, NULL, N'PHTOES000030', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOES000020', N'XY', N'ESO Chemicals', NULL, NULL, N' ', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOTP000020', N'XY', N'ESO Chemicals', NULL, NULL, N'PHTOES000020', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOES000050', N'XY', N'ESO Global PH', NULL, NULL, N' ', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOTP000060', N'XY', N'ESO Global PH', NULL, NULL, N' ', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOTP000050', N'XY', N'ESO Global PH', NULL, NULL, N'PHTOES000050', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOTP010000', N'XY', N'ESO PH', NULL, NULL, N' ', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOTP000040', N'XY', N'ESO PH', NULL, NULL, N'PHTOES000040', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHTOES000040', N'XY', N'ESO Pharma', NULL, NULL, N' ', N'E', N'PH ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDTD000020', N'XY', N'MD-Commercial', NULL, NULL, N' ', N'T', N'MD', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHBDTD000060', N'XY', N'MD-TD', NULL, NULL, N' ', N'T', N'MD', N'BTDM', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHRDRD000070', N'XY', N'PH TRD Virtual', NULL, NULL, N' ', N'D', N'Pharma TRD', N'TRD', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPGL000010', N'XY', N'Sandoz Global QA', NULL, NULL, N' ', N'E', N'SZ Global ESO', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000090', N'ZA', N'South Africa', NULL, NULL, N' ', N'C', N'AMAC', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000230', N'ZA', N'ZA, Isando', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000120', N'ZA', N'ZA, Isando', NULL, NULL, N'SZTPCT000230', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCO004110', N'ZA', N'ZA, Sparta-CO', NULL, NULL, N' ', N'C', N'CE/MEA', N'Country SZ', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPCT000240', N'ZA', N'ZA, Spartan-CO', NULL, NULL, N' ', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'SZTPWM000130', N'ZA', N'ZA, Spartan-CO', NULL, NULL, N'SZTPCT000240', N'E', N'CEE/Turkey', N'ESO', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000020', NULL, N'Australia/NZ', NULL, NULL, N' ', N'C', N'AMAC', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000010', NULL, N'Baltics  Cluster', NULL, NULL, N'PHCPEUEE0010', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEUEE0010', NULL, N'Baltics Cluster', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPLA000100', NULL, N'CAC Cluster', NULL, NULL, N' ', N'C', N'LaCan', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000430', NULL, N'CIS & Ukraine Cluster', NULL, NULL, N' ', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPEU000410', NULL, N'CIS Cluster', NULL, NULL, N'PHCPEU000430', N'C', N'CEE NPHS', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAMAF0180', NULL, N'East Africa Cluster', NULL, NULL, N' ', N'C', N'Africa', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000180', NULL, N'East Africa Cluster', NULL, NULL, N'PHCPAMAF0180', N'C', N'Africa', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAMAF0190', NULL, N'English West Africa', NULL, NULL, N' ', N'C', N'Africa', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000120', NULL, N'English West Africa', NULL, NULL, N'PHCPAMAF0190', N'C', N'Africa', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAMAF0170', NULL, N'French West Africa', NULL, NULL, N' ', N'C', N'Africa', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000170', NULL, N'French West Africa', NULL, NULL, N'PHCPAMAF0170', N'C', N'Africa', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000140', NULL, N'Levant Sub Cluster / MEC Cluster', NULL, NULL, N'PHCPAMEC0040', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAMEC0040', NULL, N'Levant/Lebanon', NULL, NULL, N' ', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PH0000000010', NULL, N'Pharma Auditing and Compliance', NULL, NULL, NULL, N'T', NULL, N'Central', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000240', NULL, N'Philippines', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000130', NULL, N'Saudi Arabia / MEC Cluster', NULL, NULL, N'PHCPAMEC0070', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000070', NULL, N'South Korea', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000270', NULL, N'Thailand', NULL, NULL, N' ', N'C', N'Asia', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCPAM000150', NULL, N'UAE / Gulf Sub Cluster / MEC Cluster', NULL, NULL, N'PHCPAMEC0070', N'C', N'MENA', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'PHCP00000090', NULL, N'Virtual', NULL, NULL, N' ', N'C', N'Global CPO', N'Country PH', NULL)
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOSO000040', N'CH', N'CH, Schaffhausen', NULL, NULL, N' ', N'T', NULL, N'Surgical', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOVO000010', N'DE', N'DE ,Grosswallstadt', NULL, NULL, N' ', N'T', NULL, N'Vision Care', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTPSO000030', N'DE', N'DE, Erlangen', NULL, NULL, NULL, N'E', N'AL ESO', N'ESO', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOSO000030', N'DE', N'DE, Erlangen / Pressath', NULL, NULL, N' ', N'T', NULL, N'Surgical', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOVO000030', N'ID', N'ID, Batam', NULL, NULL, N' ', N'T', NULL, N'Vision Care', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOSO000010', N'IE', N'IE, Cork', NULL, NULL, N' ', N'T', NULL, N'Surgical', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOSO000050', N'IL', N'IL, Tel Aviv', NULL, NULL, N' ', N'T', NULL, N'Surgical', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOVO000040', N'MY', N'MY, Johor', NULL, NULL, N' ', N'T', NULL, N'Vision Care', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOVO000020', N'SG', N'SG, Singapore', NULL, NULL, N' ', N'T', NULL, N'Vision Care', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTO00000010', N'US', N'Alcon Division', NULL, NULL, N' ', N'T', NULL, N'Central', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOVO000050', N'US', N'US, Atlanta', NULL, NULL, N' ', N'T', NULL, N'Vision Care', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOPO000040', N'US', N'US, Fort Worth North', NULL, NULL, N' ', N'T', NULL, N'Vision Care', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOSO000070', N'US', N'US, Houston', NULL, NULL, N' ', N'T', NULL, N'Surgical', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTPSO000010', N'US', N'US, Houston', NULL, NULL, NULL, N'E', N'AL ESO', N'ESO', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOSO000020', N'US', N'US, Huntington', NULL, NULL, N' ', N'T', NULL, N'Surgical', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOSO000080', N'US', N'US, Irvine', NULL, NULL, N' ', N'T', NULL, N'Surgical', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTPSO000020', N'US', N'US, Irvine', NULL, NULL, NULL, N'E', N'AL ESO', N'ESO', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (N'ANTOSO000060', N'US', N'US, Sinking Spring', NULL, NULL, N' ', N'T', NULL, N'Surgical', N'1')
GO
INSERT [dbo].[T_COM_FDA_SiteMaster] ([NQCId], [Country], [Entity], [HRId], [BPCId], [Id2016], [NQCFlag], [Region], [Technology], [Alcon]) VALUES (NULL, NULL, N' ', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[T_COM_KPIMaster] ON

GO
INSERT [dbo].[T_COM_KPIMaster] ([KPIRecordID], [KPIName]) VALUES (1, N'Lots Started')
GO
INSERT [dbo].[T_COM_KPIMaster] ([KPIRecordID], [KPIName]) VALUES (2, N'Lots Released')
GO
INSERT [dbo].[T_COM_KPIMaster] ([KPIRecordID], [KPIName]) VALUES (3, N'Lots Rejected')
GO
INSERT [dbo].[T_COM_KPIMaster] ([KPIRecordID], [KPIName]) VALUES (4, N'Number Of release and stability tests')
GO
INSERT [dbo].[T_COM_KPIMaster] ([KPIRecordID], [KPIName]) VALUES (5, N'OOS Results')
GO
INSERT [dbo].[T_COM_KPIMaster] ([KPIRecordID], [KPIName]) VALUES (6, N'OOS Invalidated')
GO
INSERT [dbo].[T_COM_KPIMaster] ([KPIRecordID], [KPIName]) VALUES (7, N'Product quality complaints')
GO
INSERT [dbo].[T_COM_KPIMaster] ([KPIRecordID], [KPIName]) VALUES (8, N'Number of dosage units distributed')
GO
SET IDENTITY_INSERT [dbo].[T_COM_KPIMaster] OFF
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'100', N'SZ', N'262', NULL, N'ZBUL', N'7612791325250', N'HE', N'1435', CAST(100 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'LOVASTATIN', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'101', N'SZ', N'263', NULL, N'ZBUL', N'7612791325250', N'HE', N'10006', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'BENAZEPRIL', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'102', N'SZ', N'270', NULL, N'ZBUL', N'7612791325250', N'HE', N'1435', CAST(250 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'LEBTALOL', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'103', N'SZ', N'277', NULL, N'ZBUL', N'7612791325250', N'HE', N'1435', CAST(1 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'FLUVOXAMINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'104', N'SZ', N'278', NULL, N'ZBUL', N'7612791325250', N'HE', N'10006', CAST(1 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'DESIPRAMINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'105', N'SZ', N'280', NULL, N'ZBUL', N'7612791325250', N'HE', N'10006', CAST(1 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'MIRTAZAPINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'106', N'SZ', N'558', NULL, N'ZBUL', N'7612791325250', N'HE', N'10006', CAST(250 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'MIRTAZAPINE', N'MIRTAZAPINE 15 MG 100 TAB UNLABLED')
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'107', N'SZ', N'593', NULL, N'ZPPP', N'7612791325250', N'HE', N'1435', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'MIRTAZAPINE', N'MIRTAZAPINE 15 MG 100 TAB UNLABLED')
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'108', N'SZ', N'607', NULL, N'ZPPP', N'7612791325250', N'HE', N'1435', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'ORPHENADRINE', N'ORPHINADRINE CITRATE USP PRT')
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'109', N'SZ', N'677', NULL, N'ZBUL', N'7612791325250', N'HE', N'10006', CAST(1 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'DIPHENOXATHRO', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'110', N'SZ', N'700', NULL, N'ZBUL', N'7612791325250', N'HE', N'10006', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'LISINOPRIL', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'111', N'SZ', N'733', NULL, N'ZBUL', N'7612791325250', N'HE', N'1436', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'FLUVOXAMINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'112', N'SZ', N'1012', NULL, N'ZBUL', N'7612791325250', N'HE', N'1436', CAST(1 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'DESIPRAMINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'113', N'SZ', N'1752', NULL, N'ZBUL', N'7612791325250', N'HE', N'10006', CAST(1 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'RESERPINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'114', N'SZ', N'1760', NULL, N'ZBUL', N'7612791325250', N'HE', N'10006', CAST(500 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'TIZANIDINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'115', N'SZ', N'1920', NULL, N'ZBUL', N'7612791325250', N'HE', N'2074', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'DOXYCYCLINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'116', N'SZ', N'2483', NULL, N'ZBUL', N'7612791325250', N'HE', N'1478', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'NALTREXONE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'117', N'SZ', N'2485', NULL, N'ZBUL', N'7612791325250', N'HE', N'1478', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'MIDODRINE', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'118', N'SZ', N'2486', NULL, N'ZBUL', N'7612791325250', N'HE', N'1478', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'FOSINOPRIL', NULL)
GO
INSERT [dbo].[T_COM_MaterialMaster] ([MaterialRecordId], [SourceSystem], [Material], [Plant], [MaterialType], [EANUPC], [EANUPCType], [Brand], [PackageSize], [MaterialDescription], [ProdSched], [ProfitCTR], [Product], [ProductDescription]) VALUES (N'119', N'SZ', N'2487', NULL, N'ZBUL', N'7612791325250', N'HE', N'1478', CAST(0 AS Decimal(17, 0)), N'NULL', N'NULL', N'NULL', N'FOSINOPRIL', NULL)
GO
SET IDENTITY_INSERT [dbo].[T_COM_StatusMaster] ON

GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (1, N'DRAFT')
GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (2, N'Define for Scope')
GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (3, N'Sent for Approval')
GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (4, N'Sent for schedule modification')
GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (5, N'Approved')
GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (6, N'Rejected')
GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (7, N'Sent for upload modification')
GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (8, N'Deleted')
GO
INSERT [dbo].[T_COM_StatusMaster] ([StatusRecordID], [StatusName]) VALUES (9, N'Sent for scope modification')
GO
SET IDENTITY_INSERT [dbo].[T_COM_StatusMaster] OFF
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'US88', N'US88', N'PHTOPO100170', N'PharmOps USA, San Carlos [US88]', N' ', N'3007886374', N'621416317', N'2', N'US', N'US, San Carlos', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ES10', N'ES10', N'PHTOPO100040', N'PharmOps Spain, Barbera de Valles [ES10]', N' ', N'3002910506', N'460940843', N'3', N'ES', N'ES, Barbera', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'IT10', N'IT10', N'PHTOPO100060', N'PharmOps Italy, Torre [IT10]', N' ', N'0', N'0', N' ', N'IT', N'IT, Torre', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'CH12A', N'CH12', N'PHTOPO110010', N'PharmOps Switzerland, Stein Solids [CH12]', N' ', N'3002653483', N'488152505', N'3', N'CH', N'CH, Stein Solids', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'DE02', N'DE02', N'PHTOPO100020', N'PharmOps Germany, Wehr [DE02]', N' ', N'3000978864', N'333288046', N'3', N'DE', N'DE, Wehr', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'EG10', N'EG10', N'PHTOPO100120', N'PharmOps Egypt, Cairo [EG10]', N' ', N'0', N'0', N' ', N'EG', N'EG, Cairo', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'TR10', N'TR10', N'PHTOPO100070', N'PharmOpsTurkey, Kurtkoy [TR10]', N' ', N'0', N'0', N' ', N'TR', N'TR, Kurtkoy', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'CN01', N'CN01', N'PHTOPO100110', N'PharmOps China, Beijing [CN01]', N' ', N'0', N'0', N' ', N'CN', N'CN, Beijing', N'Asia Pacific', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'JP01', N'JP01', N'PHTOPO100090', N'PharmOps Japan, Sasayama [JP01]', N' ', N'0', N'0', N' ', N'JP', N'JP, Sasayama', N'Asia Pacific', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SG12', N'SG12', N'PHTOPO100140', N'PharmOps Singapore, Singapore [SG12]', N' ', N'3006627732', N'894907260', N'3', N'SG', N'SG; Singapore', N'Asia Pacific', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'FR50', N'FR50', N'PHBDDS000020', N'BioPharmOps France, Huningue [FR50]', N'0', N'3007198645', N'263159719', N'1', N'FR', N'FR, Huningue', N'DS1', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOBO100010', N'NULL', N'PHTOBO100010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'FR', N'FR, Huningue', N'DS1', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SG11', N'SG11', N'PHBDDS000010', N'BiotechOps Singapore, Singapore [SG11]', N'0', N'0', N'0', N'3', N'SG', N'SG; Singapore', N'DS1', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'DE10', N'DE10', N'PHBDDS000070', N'BioPharmOps Germany, Marburg [DE90]', N'NV&D ', N'0', N'0', N'3', N'DE', N'DE, Marburg', N'DS1', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'AT15', N'AT15', N'PHBDDS000030', N'0', N'0', N'3004828473', N'301698247', N'3', N'AT', N'AT, DS-Schaftenau', N'DS1', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SI13', N'SI13', N'PHBDDS000050', N'0', N'0', N'0', N'0', N'3', N'SI', N'SI, Menges BIO', N'DS2', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'CH12B', N'CH12B', N'PHTOPO110020', N'PharmOps Switzerland, Stein Steriles [CH12]', N'0', N'3002653483', N'488152505', N'3', N'CH', N'CH, Stein Steriles', N'DP', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'AT13', N'AT13', N'PHBDDP000010', N'PharmOps Austria, Schaftenau', N'Austr', N'3004828473', N'301698247', N'3', N'AT', N'AT, DP-Schaftenau', N'DP', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'CN05', N'CN05', N'PHTOCO000070', N'ChemOps China, Suzhou [CN05]', N'0', N'3007114474', N'545297590', N'3', N'CN', N'CN, Changshu', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'GB43', N'GB43', N'PHTOCO000020', N'ChemOps UK, Grimsby [GB43]', N'0', N'10656', N'212245609', N'3', N'GB', N'GB, Grimsby', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'IE08A', N'0', N'PHTOCO000060', N'ISL Ireland, Ringaskiddy [IE08]', N'0', N'0', N'0', N' ', N'IE', N'IE, NIPBI', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'IE08', N'IE08', N'PHTOCO000030', N'ChemOps Ireland, Ringaskiddy [IE08]', N'0', N'3002807776', N'237489943', N'3', N'IE', N'IE, Ringaskiddy', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'CH28', N'CH28', N'PHTOCO000010', N'ChemOps Switzerland, Basel [CH28]', N'0', N'3002865753', N'481963890', N'1', N'CH', N'CH, Basel', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000020', N'NULL', N'SZTPAP000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CN', N'CN, Zhongshan', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000250', N'NULL', N'SZTPCT000250', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'EG', N'EG, Cairo', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000025', N'NULL', N'SZTPWM000025', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'EG', N'EG, Cairo', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000070', N'NULL', N'SZTPAP000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IN', N'IN, Mahad', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOES000010', N'0', N'PHTOES000010', N'ESO QA LatAm & Canada', N'ESO Q', N'0', N'0', N' ', N'XY', N'ESO Americas', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTPTO000020', N'NULL', N'ANTPTO000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'BE, Puurs', N'AL ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTPTO000040', N'NULL', N'ANTPTO000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'QAES (FTW)', N'AL ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHBDTD000050', N'NULL', N'PHBDTD000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CH', N'CH, TD-Stein', N'CGT', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOBO100050', N'NULL', N'PHTOBO100050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Morris-Plains C&GT', N'CGT', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'US33', N'US33', N'PHTOBO010070', N'BioPharmOps USA, Morris Plains [US33]', N'0', N'0', N'0', N' ', N'US', N'US, Morris-Plains C&GT', N'CGT', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'U501', N'U501', N'SZTONA000020', N'USA-TechOps-Broomfield', N'0', N'1717759', N'110342024', N'1', N'US', N'US, Broomfield', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'BR11', N'BR11', N'SZTONA000050', N'0', N'0', N'0', N'0', N' ', N'BR', N'BR, Cambe', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'MX11', N'MX11', N'SZTONA000060', N'0', N'0', N'0', N'0', N' ', N'MX', N'MX, Mexico-Candelaria', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'U507', N'U507', N'SZTONA000040', N'USA-TechOps-Melville', N'0', N'0', N'0', N'2', N'US', N'US, Melville', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOSS000010', N'NULL', N'SZTOSS000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Holzkirchen', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOSS000020', N'0', N'SZTOSS000020', N'Germany-TechOps-Rudolstadt', N'0', N'0', N'0', N' ', N'DE', N'DE, Rudolstadt', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'U502', N'U502', N'SZTONA000030', N'USA-TechOps-Wilson', N'0', N'0', N'0', N'2', N'US', N'US, Wilson', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'DE21', N'DE21', N'SZTOEM000060', N'0', N'0', N'0', N'0', N' ', N'DE', N'DE, Barleben', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOES000020', N'NULL', N'SZTOES000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Barleben', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'DE22', N'DE22', N'SZTOEM000070', N'0', N'0', N'0', N'0', N' ', N'DE', N'DE, Gerlingen', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOES000030', N'NULL', N'SZTOES000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Gerlingen', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SI14', N'SI14', N'SZTOES010080', N'0', N'0', N'0', N'0', N' ', N'SI', N'SI, Lendava Solids', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOES000080', N'NULL', N'SZTOES000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Lendava Solids', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SI03A', N'SI03', N'SZTOES010070', N'Slovenia-TechOps-Ljubljana-Solids', N'0', N'0', N'0', N'1', N'SI', N'SI, Ljubljana Solids', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOES000070', N'NULL', N'SZTOES000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Ljubljana Solids', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PL04', N'PL04', N'SZTOES010040', N'0', N'0', N'0', N'0', N' ', N'PL', N'PL, Strykow', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOES000040', N'NULL', N'SZTOES000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PL', N'PL, Strykow', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PL03', N'PL03', N'SZTOES010050', N'0', N'0', N'0', N'0', N' ', N'PL', N'PL, Warsaw', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOES000050', N'NULL', N'SZTOES000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PL', N'PL, Warsaw', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'DZ02', N'DZ02', N'SZTOEM010010', N'0', N'0', N'0', N'0', N' ', N'DZ', N'DZ, Algiers', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOEM000010', N'NULL', N'SZTOEM000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DZ', N'DZ, Algiers', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'TR02', N'TR02', N'SZTOEM010020', N'0', N'0', N'0', N'0', N' ', N'TR', N'TR, Gebze 1', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOEM000020', N'NULL', N'SZTOEM000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'TR', N'TR, Gebze 1', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'TR03', N'TR03', N'SZTOEM010030', N'0', N'0', N'0', N'0', N' ', N'TR', N'TR, Gebze 2', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOEM000030', N'NULL', N'SZTOEM000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'TR', N'TR, Gebze 2', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'IN91', N'IN91', N'SZTOES000120', N'India-TechOps-Kalwe', N'0', N'3004944629', N'916438583', N'3', N'IN', N'IN, Kalwe', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'RU03', N'RU03', N'SZTOES000130', N'0', N'0', N'0', N'0', N' ', N'RU', N'RU, St. Petersburg', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ZA06', N'ZA06', N'SZTOEM010050', N'South Africa-TechOps-Spartan', N'0', N'0', N'0', N' ', N'ZA', N'ZA, Spartan', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOEM000050', N'NULL', N'SZTOEM000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ZA', N'ZA, Spartan', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'RO03', N'RO03', N'SZTOES010060', N'Romania-TechOps-Targu Mures', N'0', N'3005587283', N'644903999', N'3', N'RO', N'RO, Targu Mures', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOES000060', N'NULL', N'SZTOES000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RO', N'RO, Targu Mures', N'Eastern Europe & Africa', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOAP000020', N'NULL', N'SZTOAP000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CN', N'CN, Zhongshan', N'Asia Pacific', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'JP31', N'JP31', N'SZTOAP000060', N'0', N'0', N'0', N'0', N' ', N'JP', N'JP, Kaminoyama', N'Asia Pacific', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOAP000030', N'NULL', N'SZTOAP000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ID', N'ID, Jakarta', N'Asia Pacific', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'BD02', N'BD02', N'SZTOAP000010', N'0', N'0', N'0', N'0', N' ', N'BD', N'BD, Tongi', N'Asia Pacific', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'AT12', N'AT12', N'SZTOSS000040', N'Austria-TechOps-Kundl', N'0', N'3002806523', N'300220969', N'1', N'AT', N'AT, Kundl FDF', NULL, N'Anti-Infectives')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'AT14', N'AT14', N'SZAAAA000010', N'Austria-AI/API-Kundl', N'0', N'3002806523', N'300220969', N'3', N'AT', N'AT, Kundl API', NULL, N'Anti-Infectives')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SI06', N'SI06', N'SZAAAA000080', N'Slovenia-AI/API-Lendava', N'0', N'0', N'0', N'3', N'SI', N'SI, Lendava API', NULL, N'Anti-Infectives')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ES31A', N'ES31', N'SZAAAA000030', N'Spain-AI/API-Les Franqueses', N'0', N'3002806587', N'460091325', N'2', N'ES', N'ES, Les Franqueses', NULL, N'Anti-Infectives')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SI07', N'SI07', N'SZTOES010090', N'Slovenia-TechOps-Prevalje', N'0', N'0', N'0', N'3', N'SI', N'SI, Prevalje', NULL, N'Anti-Infectives')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOES000090', N'NULL', N'SZTOES000090', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Prevalje', N' ', N'Anti-Infectives')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'IT20', N'IT20', N'SZAAAA000070', N'0', N'0', N'1000312133', N'429636954', N'3', N'IT', N'IT, Rovereto', NULL, N'Anti-Infectives')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'CA51', N'CA51', N'SZTOSS000050', N'Canada-TechOps-Boucherville', N'0', N'3000280957', N'244062071', N'3', N'CA', N'CA, Boucherville', NULL, N'Aseptics')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SI03B', N'SI03', N'SZTOSS000030', N'Slovenia-TechOps-Ljubljana-Steriles', N'Biote', N'0', N'0', N'3', N'SI', N'SI, Ljubljana Steriles', NULL, N'Aseptics')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'AT06', N'AT06', N'SZTOSS000060', N'Austria-TechOps-Unterach', N'0', N'0', N'0', N'3', N'AT', N'AT, Unterach', NULL, N'Aseptics')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'IN92', N'IN92', N'SZAAAA000050', N'India-AI/API-Mahad', N'0', N'3005983749', N'918629309', N'3', N'IN', N'IN, Mahad', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SI05', N'SI05', N'SZAAAA000090', N'Slovenia-AI/API-Menges', N'0', N'0', N'0', N'3', N'SI', N'SI, Menges API', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'TR04', N'TR04', N'SZAAAA000100', N'0', N'0', N'0', N'0', N' ', N'TR', N'TR, Tuzla', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCA000010', N'NULL', N'SZTPCA000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CA', N'CA, Boucherville TechOps', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000080', N'NULL', N'SZTPAP000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IN', N'IN, Turbhe AI', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPBO000010', N'NULL', N'SZTPBO000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Kundl BOI', N'BioPH/OncoInj.', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZBOBO000010', N'NULL', N'SZBOBO000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Kundl BOI', N'BioPH/OncoInj.', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZBOBO000040', N'NULL', N'SZBOBO000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Kundl BOI', N'BioPH/OncoInj.', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPBO000030', N'NULL', N'SZTPBO000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Menges BOI', N'BioPH/OncoInj.', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZBOBO000020', N'NULL', N'SZBOBO000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Menges BOI', N'BioPH/OncoInj.', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM010010', N'NULL', N'SZTPWM010010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Barleben Magdeburg', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000010', N'NULL', N'SZTPWE000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Barleben Magdeburg', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPBO000020', N'NULL', N'SZTPBO000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Unterach', N'BioPH/OncoInj.', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZBOBO000030', N'NULL', N'SZBOBO000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Unterach', N'BioPH/OncoInj.', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPUS000040', N'0', N'SZTPUS000040', N'USA-ComOps-Third Party Operations', N'0', N'0', N'0', N' ', N'US', N'US, ESO', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'AT03', N'AT03', N'PHBDDS000040', N'Sandoz Austria, Kundl', N'Austr', N'3002806523', N'300220969', N'3', N'AT', N'AT, Kundl BIO', N'DS2', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ES33', N'ES33', N'SZAAAA000040', N'Spain-AI/API-Palafolls', N'0', N'3005403245', N'464656979', N'3', N'ES', N'ES, Palafolis', NULL, N'Anti-Infectives')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'MA10C', N'0', N'ANTOPO000010', N'NTO Aseptics Spain, Barcelona [MA10]', N'0', N'3002894596', N'462029349', N'2', N'ES', N'ES, Barcelona', NULL, N'Aseptics')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'MA10E', N'0', N'ANTOPO000030', N'NTO Aseptics USA, Fort Worth [MA10]', N'0', N'1610287', N'7672236', N'2', N'US', N'US, Fort Worth ASPEX', NULL, N'Aseptics')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'MA10A', N'0', N'ANTOPO000070', N'NTO Aseptics Belgium, Puurs [MA10]', N'0', N'3002037047', N'370205429', N'1', N'BE', N'BE, Puurs Steriles', NULL, N'Aseptics')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'MA10B', N'0', N'ANTOPO000080', N'NTO Aseptics Brazil, Sao Paulo [MA10]', N'0', N'0', N'0', N' ', N'BR', N'BR, Sao Paulo', NULL, N'Aseptics')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'MA10D', N'0', N'ANTOPO000090', N'NTO Aseptics Singapore, Singapore [MA10]', N'0', N'3010372291', N'595170137', N'2', N'SG', N'SG, Singapore', NULL, N'Aseptics')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTO00000000', N'NULL', N'ANTO00000000', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'  ', N'Alcon TechOps', NULL, N'Central')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCP00000000', N'NULL', N'PHCP00000000', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'  ', N'Global CPO', N'Global CPO', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRD00000010', N'0', N'PHRD00000010', N'Pharma Development', N'0', N'0', N'0', N' ', N'  ', N'Pharma Development Virtual', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAMEC0080', N'0', N'PHCPAMEC0080', N'CPO UAE / Middle East, Dubai', N'CPO J', N'0', N'0', N' ', N'AE', N'Gulf/UAE', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000420', N'0', N'PHCPEU000420', N'CPO Albania, Tirana', N'0', N'0', N'0', N' ', N'AL', N'Albania', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTONA000070', N'NULL', N'SZTONA000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AR', N'AR, Olivos, B.A', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOSA000010', N'NULL', N'SZCOSA000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AR', N'AR, Olivos, B.A.', N'NA/LATAM', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPLA000030', N'NULL', N'SZTPLA000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AR', N'AR, Olivos, B.A.', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000090', N'0', N'PHCPLA000090', N'CPO Argentina, Olivos', N'CPO U', N'0', N'0', N' ', N'AR', N'Argentina Cluster', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000080', N'NULL', N'SZTPWM000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Kundl FDF', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000080', N'NULL', N'SZTPWE000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Kundl FDF', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZRDDC000010', N'0', N'SZRDDC000010', N'Austria-SDC-Kundl', N'0', N'0', N'0', N' ', N'AT', N'AT, Kundl, AI', N'SZ Small Molecule Dev', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000150', N'NULL', N'SZTPWM000150', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Kundl, AI', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000150', N'NULL', N'SZTPWE000150', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Kundl, AI', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZRDDC000020', N'NULL', N'SZRDDC000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, Kundl, FDF', N'SZ Small Molecule Dev', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHBDTD000010', N'NULL', N'PHBDTD000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT, TD-Schaftenau', N'TD', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZRDDC000030', N'0', N'SZRDDC000030', N'Austria-SDC-Unterach', N'0', N'0', N'0', N' ', N'AT', N'AT, Unterach', N'SZ Small Molecule Dev', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCO002090', N'0', N'SZTPCO002090', N'Austria-ComOps', N'0', N'0', N'0', N' ', N'AT', N'AT, Vienna', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000140', N'NULL', N'SZTPWM000140', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT,Vienna', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000140', N'NULL', N'SZTPWE000140', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AT', N'AT,Vienna', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000210', N'0', N'PHCPEU000210', N'CPO Austria, Wien', N'0', N'0', N'0', N' ', N'AT', N'Austria', N'West Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOAP000010', N'NULL', N'SZCOAP000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AU', N'AU, Pyrmont', N'APAC', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000090', N'NULL', N'SZTPAP000090', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'AU', N'AU, Pyrmont', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000160', N'0', N'PHCPAM000160', N'CPO Bangladesh, Dhaka', N'0', N'0', N'0', N' ', N'BD', N'Bangladesh', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000010', N'NULL', N'SZTPAP000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'BD', N'BD, Tongi', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000010', N'NULL', N'SZCOWM000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'BD', N'BE, Vilvoorde', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000210', N'NULL', N'SZTPWM000210', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'BE', N'BE, Vilvoorde', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000210', N'NULL', N'SZTPWE000210', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'BE', N'BE, Vilvoorde', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000020', N'0', N'PHCPEU000020', N'CPO Belgium, Vilvoorde', N'0', N'0', N'0', N' ', N'BE', N'Belgium', N'West Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000220', N'0', N'PHCPEU000220', N'CPO Bulgaria, Sofia', N'0', N'0', N'0', N' ', N'BG', N'Bulgaria', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPLA000010', N'NULL', N'SZTPLA000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'BR', N'BR, Cambe', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOPO100190', N'NULL', N'PHTOPO100190', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'BR', N'BR, Import Testing Brazil', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOCO000080', N'NULL', N'PHTOCO000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'BR', N'BR, Stability Brazil', NULL, N'ChemOps')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000010', N'0', N'PHCPLA000010', N'CPO Brazil, Sao Paulo', N'0', N'0', N'0', N' ', N'BR', N'Brazil', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCONA000020', N'0', N'SZCONA000020', N'Canada-ComOps-Boucherville', N'0', N'0', N'0', N' ', N'CA', N'CA, Boucherville', N'NA/LATAM', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZRDDC000040', N'NULL', N'SZRDDC000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CA', N'CA, Boucherville', N'SZ Small Molecule Dev', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCA000020', N'NULL', N'SZTPCA000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CA', N'CA, Boucherville ComOps', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000020', N'0', N'PHCPLA000020', N'CPO Canada, Mississauga [CA01]', N'CPO C', N'0', N'0', N' ', N'CA', N'Canada', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000010', N'0', N'PHRDRD000010', N'TRD Switzerland, Basel', N'TRD S', N'0', N'0', N' ', N'CH', N'CH, Basel', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000020', N'NULL', N'SZCOWM000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CH', N'CH, Cham', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000220', N'NULL', N'SZTPWM000220', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CH', N'CH, Cham', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000220', N'NULL', N'SZTPWE000220', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CH', N'CH, Cham', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHBDDS000060', N'0', N'PHBDDS000060', N'NTO BTDM DS Switzerland, Basel', N'BioTe', N'0', N'0', N' ', N'CH', N'CH, DS Basel', N'DS2', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOBO100040', N'NULL', N'PHTOBO100040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CH', N'CH, DS Basel', N'DS2', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHBDTD000040', N'NULL', N'PHBDTD000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CH', N'CH, TD-Basel', N'TD', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000350', N'0', N'PHCPEU000350', N'CPO Switzerland, Rotkreuz', N'0', N'0', N'0', N' ', N'CH', N'Switzerland', N'West Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000030', N'0', N'PHCPLA000030', N'CPO Chile, Santiago de Chile', N'0', N'0', N'0', N' ', N'CL', N'Chile', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPCN000010', N'0', N'PHCPCN000010', N'CPO China, Beijing', N'0', N'0', N'0', N' ', N'CN', N'China', N'China', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000040', N'0', N'PHRDRD000040', N'TRD China, Changshu', N'TRD C', N'0', N'0', N' ', N'CN', N'CN, Changshu', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOAP000020', N'NULL', N'SZCOAP000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CN', N'CN, Shanghai', N'APAC', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000100', N'NULL', N'SZTPAP000100', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CN', N'CN, Shanghai', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000040', N'0', N'PHCPLA000040', N'CPO Colombia, Bogota', N'0', N'0', N'0', N' ', N'CO', N'Colombia', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000310', N'0', N'PHCPEU000310', N'CPO Serbien', N'0', N'0', N'0', N' ', N'CS', N'Serbia', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000240', N'0', N'PHCPEU000240', N'CPO Cyprus, Nicosia', N'0', N'0', N'0', N' ', N'CY', N'Cyprus', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000010', N'NULL', N'SZCOCF000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CZ', N'CZ, Praha', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000080', N'NULL', N'SZTPCT000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CZ', N'CZ, Praha', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000080', N'NULL', N'SZTPCE000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CZ', N'CZ, Praha', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000250', N'0', N'PHCPEU000250', N'CPO Czech Republic, Praha', N'0', N'0', N'0', N' ', N'CZ', N'Czech Republic', N'East Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000020', N'NULL', N'SZTPWM000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Gerlingen', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000020', N'NULL', N'SZTPWE000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Gerlingen', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCODE000010', N'NULL', N'SZCODE000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Holzkirchen', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZRDDC000050', N'NULL', N'SZRDDC000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Holzkirchen', N'SZ Small Molecule Dev', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000300', N'NULL', N'SZTPWM000300', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Holzkirchen', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000300', N'NULL', N'SZTPWE000300', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Holzkirchen', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000060', N'NULL', N'SZTPWM000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Holzkirchen TechOps', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000060', N'NULL', N'SZTPWE000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Holzkirchen TechOps', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCODE000020', N'NULL', N'SZCODE000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Oberhaching', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZRDDC000060', N'NULL', N'SZRDDC000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Rudolstadt', N'SZ Small Molecule Dev', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000070', N'NULL', N'SZTPWM000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Rudolstadt', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000070', N'NULL', N'SZTPWE000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Rudolstadt', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000060', N'0', N'PHCPEU000060', N'CPO Germany, N�rnberg [DE01]', N'0', N'0', N'0', N' ', N'DE', N'Germany', N'Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZ0000000010', N'NULL', N'SZ0000000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'Sandoz Division', NULL, N'Central')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000030', N'0', N'PHCPEU000030', N'CPO Denmark, Copenhagen', N'0', N'0', N'0', N' ', N'DK', N'Denmark', N'Nordics', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000030', N'NULL', N'SZCOWM000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DK', N'DK, Copenhagen', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000230', N'NULL', N'SZTPWM000230', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DK', N'DK, Copenhagen', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000230', N'NULL', N'SZTPWE000230', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DK', N'DK, Copenhagen', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000010', N'0', N'PHCPAM000010', N'CPO Algeria, Alger', N'0', N'0', N'0', N' ', N'DZ', N'Algeria', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000220', N'NULL', N'SZTPCT000220', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DZ', N'DZ, Algier', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000090', N'NULL', N'SZTPWM000090', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DZ', N'DZ, Algier', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000050', N'0', N'PHCPLA000050', N'CPO Ecuador, Quito', N'0', N'0', N'0', N' ', N'EC', N'Ecuador', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCO004120', N'NULL', N'SZTPCO004120', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'EG', N'EG, Egypt', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000040', N'0', N'PHCPAM000040', N'CPO Egypt, Cairo', N'0', N'0', N'0', N' ', N'EG', N'Egypt', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000170', N'NULL', N'SZTPWM000170', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ES', N'ES, Les Franqueses', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000170', N'NULL', N'SZTPWE000170', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ES', N'ES, Les Franqueses', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000040', N'NULL', N'SZCOWM000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ES', N'ES, Madrid', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000240', N'NULL', N'SZTPWM000240', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ES', N'ES, Madrid', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000240', N'NULL', N'SZTPWE000240', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ES', N'ES, Madrid', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000180', N'NULL', N'SZTPWM000180', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ES', N'ES, Palafolls', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000180', N'NULL', N'SZTPWE000180', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ES', N'ES, Palafolls', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000340', N'0', N'PHCPEU000340', N'CPO Spain, Barcelona', N'0', N'0', N'0', N' ', N'ES', N'Spain', N'Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000040', N'0', N'PHCPEU000040', N'CPO Finland, Espoo', N'0', N'0', N'0', N' ', N'FI', N'Finland', N'Nordics', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000050', N'NULL', N'SZCOWM000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'FR', N'FR, Levallois-Perret', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000250', N'NULL', N'SZTPWM000250', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'FR', N'FR, Levallois-Perret', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000250', N'NULL', N'SZTPWE000250', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'FR', N'FR, Levallois-Perret', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000050', N'0', N'PHCPEU000050', N'CPO France, Rueil Malmaison', N'0', N'0', N'0', N' ', N'FR', N'France', N'Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000060', N'NULL', N'SZCOWM000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'GB', N'GB, Frimley/Camberley', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000260', N'NULL', N'SZTPWM000260', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'GB', N'GB, Frimley/Camberley', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000260', N'NULL', N'SZTPWE000260', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'GB', N'GB, Frimley/Camberley', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000120', N'0', N'PHRDRD000120', N'TRD UK Commercial, Sittingbourne', N'0', N'0', N'0', N' ', N'GB', N'GB, Kent', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000140', N'0', N'PHCPEU000140', N'CPO UK, Frimley', N'0', N'0', N'0', N' ', N'GB', N'United Kingdom', N'Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000070', N'0', N'PHCPEU000070', N'CPO Greece, Athens', N'0', N'0', N'0', N' ', N'GR', N'Greece', N'West Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPCN000020', N'0', N'PHCPCN000020', N'CPO Hong Kong, Hong Kong', N'0', N'0', N'0', N' ', N'HK', N'Hong Kong', N'China', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000230', N'0', N'PHCPEU000230', N'CPO Croatia, Zagreb', N'0', N'0', N'0', N' ', N'HR', N'Croatia', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000020', N'NULL', N'SZCOCF000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'HR', N'HR, Zagreb', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000090', N'NULL', N'SZTPCT000090', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'HR', N'HR, Zagreb', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000090', N'NULL', N'SZTPCE000090', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'HR', N'HR, Zagreb', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000030', N'NULL', N'SZCOCF000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'HU', N'HU, Budapest', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000100', N'NULL', N'SZTPCT000100', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'HU', N'HU, Budapest', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000100', N'NULL', N'SZTPCE000100', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'HU', N'HU, Budapest', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000260', N'0', N'PHCPEU000260', N'CPO Hungary, Budapest', N'0', N'0', N'0', N' ', N'HU', N'Hungary', N'East Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000030', N'NULL', N'SZTPAP000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ID', N'ID, Jakarta', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000210', N'0', N'PHCPAM000210', N'CPO Indonesia, Jakarta', N'0', N'0', N'0', N' ', N'ID', N'Indonesia', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000070', N'NULL', N'SZCOWM000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IE', N'IE, Cork', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000080', N'0', N'PHCPEU000080', N'CPO Ireland, Dublin', N'0', N'0', N'0', N' ', N'IE', N'Ireland', N'Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000050', N'0', N'PHCPAM000050', N'CPO Israel, Petach Tikva', N'0', N'0', N'0', N' ', N'IL', N'Israel', N'East Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000100', N'0', N'PHRDRD000100', N'ARD India, Genome Valley', N'0', N'0', N'0', N' ', N'IN', N'IN, Hyderabad Genome Valley', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000090', N'0', N'PHRDRD000090', N'TRD India, Hyderabad', N'PLS M', N'0', N'0', N' ', N'IN', N'IN, Hyderabad NKC', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000040', N'NULL', N'SZTPAP000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IN', N'IN, Kalwe', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTOAP000040', N'NULL', N'SZTOAP000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IN', N'IN, Kalwe', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOAP000030', N'0', N'SZCOAP000030', N'India-ComOps', N'0', N'0', N'0', N' ', N'IN', N'IN, Thane', N'APAC', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000110', N'NULL', N'SZTPAP000110', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IN', N'IN, Thane', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000030', N'0', N'PHCPAM000030', N'CPO India, Mumbai', N'0', N'0', N'0', N' ', N'IN', N'India', N'AMAC', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000080', N'NULL', N'SZCOWM000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IT', N'IT, Origgio', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000280', N'NULL', N'SZTPWM000280', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IT', N'IT, Origgio', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000280', N'NULL', N'SZTPWE000280', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IT', N'IT, Origgio', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000190', N'NULL', N'SZTPWM000190', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IT', N'IT, Rovereto', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000190', N'NULL', N'SZTPWE000190', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IT', N'IT, Rovereto', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000270', N'0', N'PHCPEU000270', N'CPO Italy, Origgio', N'0', N'0', N'0', N' ', N'IT', N'Italy', N'Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOPO300000', N'0', N'PHTOPO300000', N'Pharmanalytica, Locarno [CH17]', N'0', N'0', N'0', N' ', N'IT', N'Pharmanalytica (Locarno)', N'Europe', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCP00000020', N'0', N'PHCP00000020', N'CPO Japan, Tokyo [JP01]', N'0', N'0', N'0', N' ', N'JP', N'Japan', N'Global CPO', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000060', N'NULL', N'SZTPAP000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'JP', N'JP, Kaminoyama', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000060', N'0', N'PHRDRD000060', N'TRD Japan, Tokyo', N'0', N'0', N'0', N' ', N'JP', N'JP, Tokyo', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOAP000040', N'NULL', N'SZCOAP000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'JP', N'JP, Tokyo', N'APAC', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000120', N'NULL', N'SZTPAP000120', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'JP', N'JP, Tokyo', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOAP000050', N'NULL', N'SZCOAP000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'KR', N'KR, Seoul', N'APAC', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000130', N'NULL', N'SZTPAP000130', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'KR', N'KR, Seoul', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000080', N'0', N'PHCPAM000080', N'CPO Morocco, Casablanca', N'0', N'0', N'0', N' ', N'MA', N'Morocco', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000040', N'NULL', N'SZCOCF000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'MC', N'MC, Skopje', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000110', N'NULL', N'SZTPCT000110', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'MC', N'MC, Skopje', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000110', N'NULL', N'SZTPCE000110', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'MC', N'MC, Skopje', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000280', N'0', N'PHCPEU000280', N'CPO Malta, Marsa', N'0', N'0', N'0', N' ', N'MT', N'Malta', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000060', N'0', N'PHCPLA000060', N'CPO Mexico, Ciudad de Mexico', N'0', N'0', N'0', N' ', N'MX', N'Mexico', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPLA000020', N'NULL', N'SZTPLA000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'MX', N'MX, Mexico', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000220', N'0', N'PHCPAM000220', N'CPO Malaysia, Shah Alam', N'0', N'0', N'0', N' ', N'MY', N'Malaysia', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000090', N'0', N'PHCPEU000090', N'CPO Netherlands, Arnhem', N'0', N'0', N'0', N' ', N'NL', N'Netherlands', N'West Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000090', N'NULL', N'SZCOWM000090', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'NL', N'NL, Almere', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000290', N'NULL', N'SZTPWM000290', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'NL', N'NL, Almere', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000290', N'NULL', N'SZTPWE000290', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'NL', N'NL, Almere', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000100', N'0', N'PHCPEU000100', N'CPO Norway, Oslo', N'0', N'0', N'0', N' ', N'NO', N'Norway', N'Nordics', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000070', N'0', N'PHCPLA000070', N'CPO Peru, Lima', N'0', N'0', N'0', N' ', N'PE', N'Peru', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOAP000060', N'NULL', N'SZCOAP000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PH', N'PH, Manila', N'APAC', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000140', N'NULL', N'SZTPAP000140', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PH', N'PH, Manila', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000230', N'0', N'PHCPAM000230', N'CPO Pakistan, Karachi', N'0', N'0', N'0', N' ', N'PK', N'Pakistan', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000160', N'NULL', N'SZTPCT000160', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PL', N'PL, Strykow', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000030', N'NULL', N'SZTPWE000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PL', N'PL, Strykow', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000050', N'NULL', N'SZCOCF000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PL', N'PL, Warszawa', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000120', N'NULL', N'SZTPCT000120', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PL', N'PL, Warszawa', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000040', N'NULL', N'SZTPWE000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PL', N'PL, Warszawa', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000110', N'0', N'PHCPEU000110', N'CPO Poland, Warszawa', N'0', N'0', N'0', N' ', N'PL', N'Poland', N'East Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000120', N'0', N'PHCPEU000120', N'CPO Portugal, Sintra', N'CPO P', N'0', N'0', N' ', N'PT', N'Portugal', N'West Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOWM000100', N'NULL', N'SZCOWM000100', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PT', N'PT, Sintra', N'WE', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000320', N'NULL', N'SZTPWM000320', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PT', N'PT, Sintra', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000320', N'NULL', N'SZTPWE000320', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'PT', N'PT, Sintra', N'WE/MEA', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000060', N'NULL', N'SZCOCF000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RO', N'RO, Bucarest', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000130', N'NULL', N'SZTPCT000130', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RO', N'RO, Bucarest', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000130', N'NULL', N'SZTPCE000130', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RO', N'RO, Bucarest', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000170', N'NULL', N'SZTPCT000170', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RO', N'RO, Targu Mures', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000050', N'NULL', N'SZTPWE000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RO', N'RO, Targu Mures', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000290', N'0', N'PHCPEU000290', N'CPO Romania, Bucharest', N'0', N'0', N'0', N' ', N'RO', N'Romania', N'East Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000070', N'NULL', N'SZCOCF000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RU', N'RU, Moscow', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000140', N'NULL', N'SZTPCT000140', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RU', N'RU, Moscow', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000140', N'NULL', N'SZTPCE000140', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'RU', N'RU, Moscow', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000300', N'0', N'PHCPEU000300', N'CPO Russia, Moscow', N'0', N'0', N'0', N' ', N'RU', N'Russia', N'Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAMEC0070', N'0', N'PHCPAMEC0070', N'CPO Saudi Arabia, Riyadh', N'0', N'0', N'0', N' ', N'SA', N'Saudi Arabia', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000130', N'0', N'PHCPEU000130', N'CPO Sweden, Taby / Stockholm', N'0', N'0', N'0', N' ', N'SE', N'Sweden', N'Nordics', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOAP000070', N'NULL', N'SZCOAP000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SG', N'SG, Singapore', N'APAC', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000150', N'NULL', N'SZTPAP000150', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SG', N'SG, Singapore', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000250', N'0', N'PHCPAM000250', N'CPO Singapore, Singapore', N'0', N'0', N'0', N' ', N'SG', N'Singapore', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000020', N'NULL', N'SZTPCT000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Lendava', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000020', N'NULL', N'SZTPCE000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Lendava', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000060', N'NULL', N'SZTPCT000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Lendava, A', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000060', N'NULL', N'SZTPCE000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Lendava, A', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000080', N'0', N'SZCOCF000080', N'Slovenia-ComOps', N'0', N'0', N'0', N' ', N'SI', N'SI, Ljubljana', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000100', N'0', N'SZCOCF000100', N'Slovenia-TechOps-Complaint Center', N'0', N'0', N'0', N' ', N'SI', N'SI, Ljubljana', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000150', N'NULL', N'SZTPCT000150', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Ljubljana', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000150', N'NULL', N'SZTPCE000150', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Ljubljana', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000010', N'NULL', N'SZTPCT000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Ljubljana - Solids', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000040', N'NULL', N'SZTPCT000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Ljubljana - Steriles', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000040', N'NULL', N'SZTPCE000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Ljubljana - Steriles', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZRDDC000080', N'0', N'SZRDDC000080', N'Slovenia-SDC', N'0', N'0', N'0', N' ', N'SI', N'SI, Ljubljana, FDF', N'SZ Small Molecule Dev', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZRDDC000090', N'NULL', N'SZRDDC000090', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Menges, API', N'SZ Small Molecule Dev', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000070', N'NULL', N'SZTPCT000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Menges, API', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000070', N'NULL', N'SZTPCE000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Menges, API', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000030', N'NULL', N'SZTPCT000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Prevalje', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000030', N'NULL', N'SZTPCE000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Prevalje', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPBO000040', N'NULL', N'SZTPBO000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, Schaftenau BP', N'BioPH/OncoInj.', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHBDTD000030', N'NULL', N'PHBDTD000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SI', N'SI, TD-Menges', N'TD', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000330', N'0', N'PHCPEU000330', N'CPO Slovenia, Ljubljana', N'0', N'0', N'0', N' ', N'SI', N'Slovenia', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCE000010', N'NULL', N'SZTPCE000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'Si', N'SI, Ljubljana - Solids', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000320', N'0', N'PHCPEU000320', N'CPO Slovak Republic, Bratislava', N'CPO G', N'0', N'0', N' ', N'SK', N'Slovakia', N'East Europe', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000100', N'0', N'PHCPAM000100', N'CPO Tunisia, Tunis', N'0', N'0', N'0', N' ', N'TN', N'Tunisia', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000180', N'NULL', N'SZTPCT000180', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'TR', N'TR, Gebze I', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000100', N'NULL', N'SZTPWE000100', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'TR', N'TR, Gebze I', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000190', N'NULL', N'SZTPCT000190', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'TR', N'TR, Gebze II', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000110', N'NULL', N'SZTPWE000110', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'TR', N'TR, Gebze II', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000200', N'NULL', N'SZTPCT000200', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'TR', N'TR, Tuzla', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWE000200', N'NULL', N'SZTPWE000200', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'TR', N'TR, Tuzla', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000110', N'0', N'PHCPAM000110', N'CPO Turkey, Istanbul', N'0', N'0', N'0', N' ', N'TR', N'Turkey', N'AMAC', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000260', N'0', N'PHCPAM000260', N'CPO Taiwan, Taipei', N'0', N'0', N'0', N' ', N'TW', N'Taiwan', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOCF000090', N'NULL', N'SZCOCF000090', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'UA', N'UA, Kiew', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000210', N'NULL', N'SZTPCT000210', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'UA', N'UA, Kiew', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000360', N'NULL', N'PHCPEU000360', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'UA', N'Ukraine', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTPTO000010', N'NULL', N'ANTPTO000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'ES, Barcelona', N'AL ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPUS000010', N'0', N'SZTPUS000010', N'GX USBR TPO - Sandoz Inc. Broomfield, Third Party Operations, USA', N'0', N'0', N'0', N' ', N'US', N'US, Broomfield', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000020', N'0', N'PHRDRD000020', N'TRD USA, East Hanover', N'0', N'0', N'0', N' ', N'US', N'US, East Hanover', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPUS000020', N'NULL', N'SZTPUS000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Melville', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCONA000010', N'0', N'SZCONA000010', N'USA-ComOps-Pharmacovigilance', N'0', N'0', N'0', N' ', N'US', N'US, Princeton', N'NA/LATAM', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000030', N'0', N'PHRDRD000030', N'TRD USA, San Carlos', N'0', N'0', N'0', N' ', N'US', N'US, San Carlos', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOPO100180', N'NULL', N'PHTOPO100180', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Stability US', N'Americas & Specials', N'Solids')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPUS000030', N'NULL', N'SZTPUS000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Wilson', N'Americas', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCP00000030', N'0', N'PHCP00000030', N'CPO USA, East Hanover', N'0', N'0', N'0', N' ', N'US', N'USA', N'Global CPO', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000080', N'0', N'PHCPLA000080', N'CPO Venezuela, Caracas', N'0', N'0', N'0', N' ', N'VE', N'Venezuela', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000280', N'0', N'PHCPAM000280', N'CPO Vietnam', N'0', N'0', N'0', N' ', N'VN', N'Vietnam', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPAP000160', N'NULL', N'SZTPAP000160', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'VN', N'VN, Ho-Chi-Minh-City', N'APac', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZCOAP000080', N'NULL', N'SZCOAP000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'VN', N'VN, Ho-Chi-Minh City', N'APAC', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHBDES000010', N'NULL', N'PHBDES000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'DP-ESO BTDM', N'ESO', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'CH38A', N'0', N'PHBDES000020', N'BioPharmOps TPO, Switzerland, Basel [CH38]', N'0', N'0', N'0', N' ', N'XY', N'DS-ESO BTDM', N'ESO', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOTP000010', N'NULL', N'PHTOTP000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO Americas', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOES000030', N'NULL', N'PHTOES000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO APAC & Middle East', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOTP000030', N'NULL', N'PHTOTP000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO APAC & Middle East', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOES000020', N'0', N'PHTOES000020', N'ChemOps External Supply [CH01]', N'ESO Q', N'0', N'0', N' ', N'XY', N'ESO Chemicals', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOTP000020', N'NULL', N'PHTOTP000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO Chemicals', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOES000050', N'NULL', N'PHTOES000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO Global PH', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOTP000060', N'0', N'PHTOTP000060', N'Pharma External Supply, Basel [CH01]', N'0', N'0', N'0', N' ', N'XY', N'ESO Global PH', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOTP000050', N'NULL', N'PHTOTP000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO Global PH', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOTP010000', N'NULL', N'PHTOTP010000', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO PH', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOTP000040', N'NULL', N'PHTOTP000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO PH', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHTOES000040', N'NULL', N'PHTOES000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'ESO Pharma', N'PH ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHBDTD000020', N'0', N'PHBDTD000020', N'NTO BTDM MD Switzerland, Basel', N'0', N'0', N'0', N' ', N'XY', N'MD-Commercial', N'MD', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHBDTD000060', N'NULL', N'PHBDTD000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'MD-TD', N'MD', N'BTDM')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHRDRD000070', N'NULL', N'PHRDRD000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'PH TRD Virtual', N'Pharma TRD', N'TRD')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPGL000010', N'NULL', N'SZTPGL000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'XY', N'Sandoz Global QA', N'SZ Global ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000090', N'0', N'PHCPAM000090', N'CPO South Africa, Isando', N'CPO G', N'0', N'0', N' ', N'ZA', N'South Africa', N'AMAC', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000230', N'NULL', N'SZTPCT000230', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ZA', N'ZA, Isando', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000120', N'NULL', N'SZTPWM000120', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ZA', N'ZA, Isando', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCO004110', N'NULL', N'SZTPCO004110', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ZA', N'ZA, Sparta-CO', N'CE/MEA', N'Country SZ')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPCT000240', N'NULL', N'SZTPCT000240', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ZA', N'ZA, Spartan-CO', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'SZTPWM000130', N'NULL', N'SZTPWM000130', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ZA', N'ZA, Spartan-CO', N'CEE/Turkey', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000020', N'0', N'PHCPAM000020', N'CPO Australia, North Ryde', N'CPO N', N'0', N'0', N' ', NULL, N'Australia/NZ', N'AMAC', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000010', N'NULL', N'PHCPEU000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'Baltics  Cluster', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEUEE0010', N'0', N'PHCPEUEE0010', N'CPO Baltics, Riga', N'0', N'0', N'0', N' ', NULL, N'Baltics Cluster', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPLA000100', N'0', N'PHCPLA000100', N'CPO Guatemala, Guatemala', N'0', N'0', N'0', N' ', NULL, N'CAC Cluster', N'LaCan', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000430', N'0', N'PHCPEU000430', N'CPO Ukraine, Kiev', N'CPO K', N'0', N'0', N' ', NULL, N'CIS & Ukraine Cluster', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPEU000410', N'NULL', N'PHCPEU000410', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'CIS Cluster', N'CEE NPHS', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAMAF0180', N'0', N'PHCPAMAF0180', N'CPO GoC East Africa, Nairobi', N'0', N'0', N'0', N' ', NULL, N'East Africa Cluster', N'Africa', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000180', N'NULL', N'PHCPAM000180', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'East Africa Cluster', N'Africa', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAMAF0190', N'0', N'PHCPAMAF0190', N'CPO Nigeria, Lagos', N'CPO G', N'0', N'0', N' ', NULL, N'English West Africa', N'Africa', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000120', N'NULL', N'PHCPAM000120', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'English West Africa', N'Africa', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAMAF0170', N'0', N'PHCPAMAF0170', N'CPO GoC French West Africa, Abidjan', N'0', N'0', N'0', N' ', NULL, N'French West Africa', N'Africa', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000170', N'NULL', N'PHCPAM000170', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'French West Africa', N'Africa', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000140', N'NULL', N'PHCPAM000140', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'Levant Sub Cluster / MEC Cluster', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAMEC0040', N'0', N'PHCPAMEC0040', N'CPO Lebanon, Beirut', N'0', N'0', N'0', N' ', NULL, N'Levant/Lebanon', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PH0000000010', N'NULL', N'PH0000000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'Pharma Auditing and Compliance', NULL, N'Central')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000240', N'0', N'PHCPAM000240', N'CPO Philippines, Manila', N'0', N'0', N'0', N' ', NULL, N'Philippines', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000130', N'NULL', N'PHCPAM000130', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'Saudi Arabia / MEC Cluster', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000070', N'0', N'PHCPAM000070', N'CPO Korea, Seoul', N'0', N'0', N'0', N' ', NULL, N'South Korea', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000270', N'0', N'PHCPAM000270', N'CPO Thailand, Bankok', N'0', N'0', N'0', N' ', NULL, N'Thailand', N'Asia', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCPAM000150', N'NULL', N'PHCPAM000150', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N'UAE / Gulf Sub Cluster / MEC Cluster', N'MENA', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'PHCP00000090', N'0', N'PHCP00000090', N'CPO Global', N'0', N'0', N'0', N' ', NULL, N'Virtual', N'Global CPO', N'Country PH')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOSO000040', N'NULL', N'ANTOSO000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'CH', N'CH, Schaffhausen', NULL, N'Surgical')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOVO000010', N'NULL', N'ANTOVO000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE ,Grosswallstadt', NULL, N'Vision Care')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTPSO000030', N'NULL', N'ANTPSO000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Erlangen', N'AL ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOSO000030', N'NULL', N'ANTOSO000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'DE', N'DE, Erlangen / Pressath', NULL, N'Surgical')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOVO000030', N'NULL', N'ANTOVO000030', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'ID', N'ID, Batam', NULL, N'Vision Care')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOSO000010', N'NULL', N'ANTOSO000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IE', N'IE, Cork', NULL, N'Surgical')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOSO000050', N'NULL', N'ANTOSO000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'IL', N'IL, Tel Aviv', NULL, N'Surgical')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOVO000040', N'NULL', N'ANTOVO000040', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'MY', N'MY, Johor', NULL, N'Vision Care')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOVO000020', N'NULL', N'ANTOVO000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'SG', N'SG, Singapore', NULL, N'Vision Care')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTO00000010', N'NULL', N'ANTO00000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'Alcon Division', NULL, N'Central')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOVO000050', N'NULL', N'ANTOVO000050', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Atlanta', NULL, N'Vision Care')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'MA10F', N'0', N'ANTOPO000040', N'Alcon USA, Fort Worth North [MA10]', N'0', N'0', N'0', N' ', N'US', N'US, Fort Worth North', NULL, N'Vision Care')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOSO000070', N'NULL', N'ANTOSO000070', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Houston', NULL, N'Surgical')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTPSO000010', N'NULL', N'ANTPSO000010', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Houston', N'AL ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOSO000020', N'NULL', N'ANTOSO000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Huntington', NULL, N'Surgical')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOSO000080', N'NULL', N'ANTOSO000080', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Irvine', NULL, N'Surgical')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTPSO000020', N'NULL', N'ANTPSO000020', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Irvine', N'AL ESO', N'ESO')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'ANTOSO000060', N'NULL', N'ANTOSO000060', N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', N'US', N'US, Sinking Spring', NULL, N'Surgical')
GO
INSERT [dbo].[T_LKP_SitePlantMaintenance] ([SiteRecordId], [Plant], [NQCId], [ResponsibleSite1], [ResponsibleSite2], [FEI], [DUNS], [FDA], [Country], [Entity], [Region], [Technology]) VALUES (N'0', N'NULL', NULL, N'NULL', N'NULL', N'NULL', N'NULL', N'NULL', NULL, N' ', NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_ApplicationHeader] ([ApplicationId], [ApplicationName], [IsGlobal], [UseADGroup], [IsActive], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn], [ValidFrom], [ValidTo]) VALUES (111, N'FDA', N'0', N'AD', N'1', N'A12345', CAST(N'2017-06-08 00:00:00.000' AS DateTime), NULL, NULL, CAST(N'2017-06-08' AS Date), CAST(N'2017-06-08' AS Date))
GO
INSERT [dbo].[T_SYS_UM_ApplicationObjects] ([AppObjectId], [AppObjectName], [ApplicationRecordId], [ValidFrom], [ValidTo], [IsActive], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (1, N'Schedule', 111, CAST(N'2017-04-07' AS Date), CAST(N'2017-04-07' AS Date), 1, N'A12345', CAST(N'2017-04-09 00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_ApplicationObjects] ([AppObjectId], [AppObjectName], [ApplicationRecordId], [ValidFrom], [ValidTo], [IsActive], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (2, N'Upload', 111, CAST(N'2017-04-07' AS Date), CAST(N'2017-04-07' AS Date), 1, N'A12345', CAST(N'2017-04-09 00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_ApplicationObjects] ([AppObjectId], [AppObjectName], [ApplicationRecordId], [ValidFrom], [ValidTo], [IsActive], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (3, N'Metrices', 111, CAST(N'2017-04-07' AS Date), CAST(N'2017-04-07' AS Date), 1, N'A12345', CAST(N'2017-04-09 00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_Group] ([GroupId], [GroupName]) VALUES (1, N'Site1UG')
GO
INSERT [dbo].[T_SYS_UM_Group] ([GroupId], [GroupName]) VALUES (2, N'Site2UG')
GO
INSERT [dbo].[T_SYS_UM_Permissions] ([PermissionObjectId], [PermObjectName], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (1, N'Create', N'A12345', CAST(N'2017-05-07 00:00:00.000' AS DateTime), CAST(N'2017-05-07' AS Date), CAST(N'2017-05-07' AS Date), 1, NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_Permissions] ([PermissionObjectId], [PermObjectName], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (2, N'View', N'A12345', CAST(N'2017-05-07 00:00:00.000' AS DateTime), CAST(N'2017-05-07' AS Date), CAST(N'2017-05-07' AS Date), 1, NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_Permissions] ([PermissionObjectId], [PermObjectName], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (3, N'Delete', N'A12345', CAST(N'2017-05-07 00:00:00.000' AS DateTime), CAST(N'2017-05-07' AS Date), CAST(N'2017-05-07' AS Date), 1, NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_RoleMaster] ([RoleId], [RoleName], [ApplicationRecordId], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsGlobal], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (1, N'Site Plant Coordinator', 111, N'A12345', CAST(N'2017-04-07 00:00:00.000' AS DateTime), CAST(N'2017-04-07' AS Date), CAST(N'2018-04-07' AS Date), 1, 1, NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_RoleMaster] ([RoleId], [RoleName], [ApplicationRecordId], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsGlobal], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (2, N'Site Plant Approver', 111, N'C12345', CAST(N'2017-08-07 00:00:00.000' AS DateTime), CAST(N'2017-08-07' AS Date), CAST(N'2018-08-07' AS Date), 1, 1, NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_RoleMaster] ([RoleId], [RoleName], [ApplicationRecordId], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsGlobal], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (3, N'Global Plant Coordinator', 111, N'D1234', CAST(N'2017-09-07 00:00:00.000' AS DateTime), CAST(N'2017-09-07' AS Date), CAST(N'2018-09-07' AS Date), 1, 1, NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_RolePermissionRelation] ([RoleID], [RoleName], [ObjectID], [AppObjectName], [PermissionID], [PermObjectName], [IsActive], [ValidFrom], [ValidTo], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (1, N'Global Plant Coordinator', 1, N'Schedule', 1, N'create', 1, CAST(N'2017-05-07' AS Date), CAST(N'2017-05-07' AS Date), N'A12345', CAST(N'2017-05-07 00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_RolePermissionRelation] ([RoleID], [RoleName], [ObjectID], [AppObjectName], [PermissionID], [PermObjectName], [IsActive], [ValidFrom], [ValidTo], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (2, N'Site Plant Coordinator', 1, N'Schedule', 1, N'create', 1, CAST(N'2017-05-07' AS Date), CAST(N'2017-05-07' AS Date), N'C12345', CAST(N'2017-05-07 00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_User] ([UserId], [FirstName], [LastName], [Designation], [Organization], [ManagerId], [ManagerName], [IsGDDB], [EmailId], [CEGStatus], [HRStatus], [IsValid], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (N'A12345', N'saurabh', N'pendhar', N'Team Lead', N'Novartis', N'M123', N'Tanja', N'Y ', N'saurabh@novartis.com', N'Y', N'active', 1, N'B1234', CAST(N'1894-06-21 00:00:00.000' AS DateTime), N'null', NULL)
GO
INSERT [dbo].[T_SYS_UM_User] ([UserId], [FirstName], [LastName], [Designation], [Organization], [ManagerId], [ManagerName], [IsGDDB], [EmailId], [CEGStatus], [HRStatus], [IsValid], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (N'B1234', N'ramya', N'chetan', N'coordinator', N'Mcbitss', N'M234', N'Rajandhuvan', N'Y ', N'ramya@novartis.com', N'Y', N'active', 1, N'C12345', CAST(N'1894-06-23 00:00:00.000' AS DateTime), N'null', NULL)
GO
INSERT [dbo].[T_SYS_UM_User] ([UserId], [FirstName], [LastName], [Designation], [Organization], [ManagerId], [ManagerName], [IsGDDB], [EmailId], [CEGStatus], [HRStatus], [IsValid], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (N'C12345', N'ashwin', N'sadana', N'coordinator', N'Mcbitss', N'M234', N'Raj', N'Y ', N'ashwin@novartis.com', N'Y', N'active', 1, N'A12345', CAST(N'1894-06-22 00:00:00.000' AS DateTime), N'null', NULL)
GO
INSERT [dbo].[T_SYS_UM_User] ([UserId], [FirstName], [LastName], [Designation], [Organization], [ManagerId], [ManagerName], [IsGDDB], [EmailId], [CEGStatus], [HRStatus], [IsValid], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (N'D1234', N'siranjeevi', N'siran', N'designer', N'Mcbitss', N'M234', N'Rajan', N'Y ', N'siranjeevi@novartis.com', N'Y', N'active', 1, N'C12345', CAST(N'1894-06-22 00:00:00.000' AS DateTime), N'null', NULL)
GO
INSERT [dbo].[T_SYS_UM_User] ([UserId], [FirstName], [LastName], [Designation], [Organization], [ManagerId], [ManagerName], [IsGDDB], [EmailId], [CEGStatus], [HRStatus], [IsValid], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (N'E1234', N'robin', N'robin', N'tester', N'Mcbitss', N'M534', N'Raj', N'Y ', N'robin@novartis.com', N'Y', N'active', 1, N'D1234', CAST(N'1894-06-23 00:00:00.000' AS DateTime), N'null', NULL)
GO
INSERT [dbo].[T_SYS_UM_User] ([UserId], [FirstName], [LastName], [Designation], [Organization], [ManagerId], [ManagerName], [IsGDDB], [EmailId], [CEGStatus], [HRStatus], [IsValid], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (N'G1234', N'Prathima', N'shetty', N'pmo', N'Mcbitss', N'M974', N'Raj', N'Y ', N'prathima@novartis.com', N'Y', N'active', 1, N'B1234', CAST(N'1894-06-26 00:00:00.000' AS DateTime), N'null', NULL)
GO
INSERT [dbo].[T_SYS_UM_User] ([UserId], [FirstName], [LastName], [Designation], [Organization], [ManagerId], [ManagerName], [IsGDDB], [EmailId], [CEGStatus], [HRStatus], [IsValid], [CreatedBy], [CreatedOn], [UpdatedBy], [UpdatedOn]) VALUES (N'R1234', N'mahesh', N'mahesh', N'uidesigner', N'Mcbitss', N'M874', N'Raj', N'Y ', N'mahesh@novartis.com', N'Y', N'active', 1, N'C12345', CAST(N'1894-06-24 00:00:00.000' AS DateTime), N'null', NULL)
GO
INSERT [dbo].[T_SYS_UM_UserGroup] ([UserId], [UserGroupId], [System], [ObjectValue], [PrimaryOwner], [PrimaryApprover], [DeputyApprover], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsGlobal], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (N'A12345', 1, N'eqarp', N'objval1', N'tanja', N'tanja', N'ashwin', N'B1234', CAST(N'2017-05-07 00:00:00.000' AS DateTime), CAST(N'2017-05-07' AS Date), CAST(N'2017-05-07' AS Date), N'Y', 1, NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_UserGroup] ([UserId], [UserGroupId], [System], [ObjectValue], [PrimaryOwner], [PrimaryApprover], [DeputyApprover], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsGlobal], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (N'C12345', 1, N'eqarp', N'objval2', N'saurabh', N'saurabh', N'tanja', N'B1234', CAST(N'2017-05-08 00:00:00.000' AS DateTime), CAST(N'2017-05-08' AS Date), CAST(N'2017-05-08' AS Date), N'Y', 1, NULL, NULL)
GO
INSERT [dbo].[T_SYS_UM_UserGroup] ([UserId], [UserGroupId], [System], [ObjectValue], [PrimaryOwner], [PrimaryApprover], [DeputyApprover], [CreatedBy], [CreatedOn], [ValidFrom], [ValidTo], [IsGlobal], [IsActive], [UpdatedBy], [UpdatedOn]) VALUES (N'D1234', 1, N'eqarp', N'objval3', N'ashwin', N'saurabh', N'tanja', N'C12345', CAST(N'2017-08-08 00:00:00.000' AS DateTime), CAST(N'2017-08-08' AS Date), CAST(N'2017-08-08' AS Date), N'Y', 1, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[users_roles] ON

GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (1, N'Ashwin', 1, 1, 1)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (2, N'Saurabh', 2, 1, 2)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (3, N'Mahesh', 3, 1, 3)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (4, N'Ashwin', 1, 2, 1)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (5, N'Saurabh', 2, 2, 2)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (6, N'Mahesh', 3, 2, 3)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (7, N'Ashwin', 1, 3, 1)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (8, N'Saurabh', 2, 3, 2)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (9, N'Mahesh', 3, 3, 3)
GO
INSERT [dbo].[users_roles] ([user_role_id], [user_name], [role_id], [site_id], [user_id]) VALUES (10, N'second', 1, 1, 4)
GO
SET IDENTITY_INSERT [dbo].[users_roles] OFF
GO
ALTER TABLE [dbo].[T_SYS_UM_AuthorizationMaster] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[T_FQM_KPI1MetricDetails]  WITH CHECK ADD  CONSTRAINT [KPI1MetricDetails_FK] FOREIGN KEY([UploadRecordId])
REFERENCES [dbo].[T_FQM_UploadHeader] ([UploadRecordId])
GO
ALTER TABLE [dbo].[T_FQM_KPI1MetricDetails] CHECK CONSTRAINT [KPI1MetricDetails_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_AccessRequestHeader]  WITH CHECK ADD  CONSTRAINT [AccessRequest_Created_FK] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[T_SYS_UM_User] ([UserId])
GO
ALTER TABLE [dbo].[T_SYS_UM_AccessRequestHeader] CHECK CONSTRAINT [AccessRequest_Created_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_AccessRequestHeader]  WITH CHECK ADD  CONSTRAINT [AccessRequest_User_FK] FOREIGN KEY([UserId])
REFERENCES [dbo].[T_SYS_UM_User] ([UserId])
GO
ALTER TABLE [dbo].[T_SYS_UM_AccessRequestHeader] CHECK CONSTRAINT [AccessRequest_User_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_ApplicationObjects]  WITH CHECK ADD  CONSTRAINT [ApplicationObjects_FK] FOREIGN KEY([ApplicationRecordId])
REFERENCES [dbo].[T_SYS_UM_ApplicationHeader] ([ApplicationId])
GO
ALTER TABLE [dbo].[T_SYS_UM_ApplicationObjects] CHECK CONSTRAINT [ApplicationObjects_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_AuthorizationMaster]  WITH CHECK ADD  CONSTRAINT [AuthorizationUser_FK] FOREIGN KEY([UserId])
REFERENCES [dbo].[T_SYS_UM_User] ([UserId])
GO
ALTER TABLE [dbo].[T_SYS_UM_AuthorizationMaster] CHECK CONSTRAINT [AuthorizationUser_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_AuthorizationMaster]  WITH CHECK ADD  CONSTRAINT [AuthorizationUser1_FK] FOREIGN KEY([ApprovedBy])
REFERENCES [dbo].[T_SYS_UM_User] ([UserId])
GO
ALTER TABLE [dbo].[T_SYS_UM_AuthorizationMaster] CHECK CONSTRAINT [AuthorizationUser1_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_AuthorizationMaster]  WITH CHECK ADD  CONSTRAINT [AuthorizationUserGroup_FK] FOREIGN KEY([UserGroupId])
REFERENCES [dbo].[T_SYS_UM_Group] ([GroupId])
GO
ALTER TABLE [dbo].[T_SYS_UM_AuthorizationMaster] CHECK CONSTRAINT [AuthorizationUserGroup_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_RoleMaster]  WITH CHECK ADD  CONSTRAINT [RoleMaster_FK] FOREIGN KEY([ApplicationRecordId])
REFERENCES [dbo].[T_SYS_UM_ApplicationHeader] ([ApplicationId])
GO
ALTER TABLE [dbo].[T_SYS_UM_RoleMaster] CHECK CONSTRAINT [RoleMaster_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_RolePermissionRelation]  WITH CHECK ADD  CONSTRAINT [RolePermission_ApplicationObj_FK] FOREIGN KEY([ObjectID])
REFERENCES [dbo].[T_SYS_UM_ApplicationObjects] ([AppObjectId])
GO
ALTER TABLE [dbo].[T_SYS_UM_RolePermissionRelation] CHECK CONSTRAINT [RolePermission_ApplicationObj_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_RolePermissionRelation]  WITH CHECK ADD  CONSTRAINT [RolePermission_Permissions_FK] FOREIGN KEY([PermissionID])
REFERENCES [dbo].[T_SYS_UM_Permissions] ([PermissionObjectId])
GO
ALTER TABLE [dbo].[T_SYS_UM_RolePermissionRelation] CHECK CONSTRAINT [RolePermission_Permissions_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_RolePermissionRelation]  WITH CHECK ADD  CONSTRAINT [RolePermission_RomeMaster_FK] FOREIGN KEY([RoleID])
REFERENCES [dbo].[T_SYS_UM_RoleMaster] ([RoleId])
GO
ALTER TABLE [dbo].[T_SYS_UM_RolePermissionRelation] CHECK CONSTRAINT [RolePermission_RomeMaster_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_UserGroup]  WITH CHECK ADD  CONSTRAINT [UserGroup_Id_FK] FOREIGN KEY([UserGroupId])
REFERENCES [dbo].[T_SYS_UM_Group] ([GroupId])
GO
ALTER TABLE [dbo].[T_SYS_UM_UserGroup] CHECK CONSTRAINT [UserGroup_Id_FK]
GO
ALTER TABLE [dbo].[T_SYS_UM_UserGroup]  WITH CHECK ADD  CONSTRAINT [UserGroup_UserId_FK] FOREIGN KEY([UserId])
REFERENCES [dbo].[T_SYS_UM_User] ([UserId])
GO
ALTER TABLE [dbo].[T_SYS_UM_UserGroup] CHECK CONSTRAINT [UserGroup_UserId_FK]
GO

/****** Object:  TableType ******/

GO
/****** Object:  UserDefinedTableType [dbo].[ScheduleDesc]    Script Date: 28-07-2017 11:16:22 ******/
CREATE TYPE [dbo].[ScheduleDesc] AS TABLE(
  [product] [nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[ScheduleDescTVP]    Script Date: 28-07-2017 11:16:23 ******/
CREATE TYPE [dbo].[ScheduleDescTVP] AS TABLE(
  [product] [nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[uploadMetricActions]    Script Date: 28-07-2017 11:16:23 ******/
CREATE TYPE [dbo].[uploadMetricActions] AS TABLE(
  [UploadMetricID] [bigint] NOT NULL,
  [comments] [varchar](200) NULL
)
CREATE PROCEDURE [dbo].[SP_COM_Get_Global_UploadApprover]
@appObjectName VARCHAR(100)
AS
BEGIN
	SELECT 
		U.UserId, U.FirstName AS [userName]
	FROM EQARP_SYS.dbo.T_SYS_UM_User AS U
	WHERE U.UserId IN 
		(SELECT UserId FROM EQARP_SYS.dbo.T_SYS_UM_AuthorizationMaster
		WHERE UserGroupId IN
			( SELECT UserGroupId from EQARP_SYS.dbo.T_SYS_UM_UserGroup WHERE AppObjectName = @appObjectName AND ObjectValue ='Global'))
END
GO
/****** Object:  StoredProcedure [dbo].[SP_COM_GetAll_ApplicationObjects]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_COM_GetAll_ApplicationObjects]
@applicationRecordID VARCHAR(100)
AS
BEGIN
	SELECT  
		ApplicationRecordId, AppObjectId, AppObjectName,
		(SELECT TOP 1 ObjectValue FROM EQARP_SYS.dbo.T_SYS_UM_UserGroup UG WHERE UG.AppObjectName = AO.AppObjectName ) As ObjectValue
	FROM EQARP_SYS.dbo.T_SYS_UM_ApplicationObjects AO
	WHERE ApplicationRecordID = @applicationRecordID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_COM_GetAllApplicationHeader]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_COM_GetAllApplicationHeader]
AS
BEGIN
	SELECT  ApplicationRecordId, ApplicationId, ApplicationName FROM EQARP_SYS.dbo.T_SYS_UM_ApplicationHeader
	WHERE IsActive = 1
END
GO
/****** Object:  StoredProcedure [dbo].[SP_COM_GetAllKPIMaster]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_COM_GetAllKPIMaster]
AS
BEGIN

SELECT 
	KPIRecordID AS [metricId], KPIName AS [metricType]
	FROM [dbo].[T_COM_KPIMaster] 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_COM_GetUploadObjectMaster]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_COM_GetUploadObjectMaster]
AS
BEGIN
	SELECT * FROM T_COM_MD_UPL_UploadObjectMaster
	WHERE UploadTableName != '' 
	OR UploadTableTemp != ''
END
GO
/****** Object:  StoredProcedure [dbo].[SP_COM_GetUploadSiteApprover]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_COM_GetUploadSiteApprover]
@SiteRecordId VARCHAR(100)
AS
BEGIN
	SELECT 
		UserId,
		FirstName AS [userName]
	FROM [EQARP_SYS].[dbo].[T_SYS_UM_User]
	WHERE UserId IN (
		SELECT UserId from [EQARP_SYS].[dbo].[T_SYS_UM_AuthorizationMaster] 
		WHERE UserGroupId IN (
			select UserGroupId from [EQARP_SYS].[dbo].[T_SYS_UM_UserGroup] where ObjectValue = @SiteRecordId and RoleID = 5
		)
	)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_COM_Update_Active_Status_Metric_Data]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_COM_Update_Active_Status_Metric_Data]
@uploadMetricActions AS dbo.uploadMetricActions READONLY
AS
BEGIN
	INSERT INTO 
		T_COM_UPL_MD_SitePlantMaintenance 
		( 
			SiteRecordId, Plant, NQCId, Country, Entity, Region, Technology, ResponsibleSite1, ResponsibleSite2,FEI,DUNS,FDA, NQC_FLAG, HR_ID, HR_ID2, BPC_ID2, PACKAGER1, PACKAGER2,
			BPC_ID, ALCON_FLAG, UploadRecordId, UploadedOn, ChangedOn, ActiveFlag
		)
	SELECT 
		SiteRecordId, Plant, NQCId, Country, Entity, Region, Technology, ResponsibleSite1, ResponsibleSite2, FEI, DUNS, FDA, NQC_FLAG, HR_ID, HR_ID2, BPC_ID2, PACKAGER1, PACKAGER2,
		BPC_ID, ALCON_FLAG, UploadRecordId, UploadedOn, ChangedOn, ActiveFlag 
	FROM T_TMP_UPL_MD_SitePlantMaintenance
	WHERE ActiveFlag = 1 
	AND UploadRecordId IN (SELECT UploadMetricID FROM @uploadMetricActions)

	DELETE FROM T_TMP_UPL_MD_SitePlantMaintenance 
	WHERE ActiveFlag = 1 
	AND UploadRecordId IN (SELECT UploadMetricID FROM @uploadMetricActions)

	INSERT INTO 
		T_COM_UPL_FFT_SI03A_IPCStabilityTests 
			( MaterialNumber,RecordID,PLANSKA_LOKACIJA,MAT_DESC,ST_IPC_NA_SIFRO,ST_NALOGOV_NA_SIFRO,AVG_IPC_NA_SIF_NALOG,UploadRecordId,UploadedOn,ChangedOn,ActiveFlag)
	SELECT 
		MaterialNumber,RecordID,PLANSKA_LOKACIJA,MAT_DESC,ST_IPC_NA_SIFRO,ST_NALOGOV_NA_SIFRO,AVG_IPC_NA_SIF_NALOG,UploadRecordId,UploadedOn,ChangedOn, UploadFlag AS ActiveFlag 
	FROM T_TMP_FFT_UPL_SI03A_IPCStabilityTests
	WHERE UploadRecordId IN (SELECT UploadMetricID FROM @uploadMetricActions)
	And  UploadFlag = 1

	DELETE FROM T_TMP_FFT_UPL_SI03A_IPCStabilityTests 
	WHERE UploadFlag = 1 
	AND UploadRecordId IN (SELECT UploadMetricID FROM @uploadMetricActions)

END
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_Add_DIM_UploadHeader]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_Add_DIM_UploadHeader] 
(  
@SiteRecordId VARCHAR(100),
@description VARCHAR(100),
@startDate date,
@endDate date,
@KPIRecordId VARCHAR(100),
@approverId VARCHAR(100), 
@CreatedBy VARCHAR(100), 
@status nvarchar(100),
@UploadTemplateRecordId nvarchar(20) = '',
@Comment nvarchar(100) = '',
@UploadRecordId    INT    OUTPUT
)  
AS  
BEGIN  
	insert into T_FQM_DIM_UploadHeader (
		SiteRecordId, 
		UploadDescription, 
		UploadStartDate, 
		UploadEndDate, 
		KPIRecordID, 
		UploadReviewer, 
		CreatedBy, 
		CreatedOn,
		UpdateBy,
		UpdatedOn,
		WFStatusId, 
		UploadTemplateRecordId
	) 
	VALUES (
		@SiteRecordId, 
		@description, 
		@startDate, 
		@endDate, 
		@KPIRecordID, 
		@approverId,
		@CreatedBy,
		GETDATE(), 
		@CreatedBy,
		GETDATE(), 
		@status,
		@UploadTemplateRecordId
	)

	SELECT @UploadRecordId = SCOPE_IDENTITY()

	declare @WorkflowChangeRecordId varchar(100)
	set @WorkflowChangeRecordId = CAST(RAND() * 1000000 AS INT)

	insert into T_COM_WF_WorkFlowMasterMaintenance (
		WorkflowChangeRecordId,
		ImpactedRecordId,
		ToStatus, 
		CreatedBy, 
		CreatedOn,
		Comment
	) 
	VALUES (
		@WorkflowChangeRecordId,
		@UploadRecordId,
		@status,
		@CreatedBy,
		GETDATE(), 
		@Comment
	)
    SELECT @UploadRecordId as id

    RETURN
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_DIM_GetAll_DIM_UploadHeaders_ByRole]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_DIM_GetAll_DIM_UploadHeaders_ByRole]
(
@role VARCHAR(100),
@UserID varchar(100)	
)

AS
BEGIN
DECLARE @query varchar(2000);
set @query = ' SELECT
  UH.UploadRecordId as uploadRequestID, 
  uploadDescription, UploadStartDate as startDate, 
  UploadEndDate as endDate, UH.WFStatusId as statusCode, 
  w.StatusDescription as status, 
  CreatedOn As uploadDate,
  (select top 1 user_name from users_roles where user_id = UH.CreatedBy ) as  uploadedBy,
  (select top 1 user_name from users_roles where user_id = UH.UploadReviewer ) as  approvedBy,
  (select top 1 UploadObjectDescription from T_COM_MD_UPL_UploadObjectMaster where UploadObjectID = UH.KPIRecordId ) as  metricsUpload 
  from T_FQM_DIM_UploadHeader UH 
  INNER JOIN T_COM_WF_WorkFlowStatus w on UH.WFStatusId = w.WorkFlowRecordID
  where  UH.WFStatusId'
  if(@role = 'auth')
   BEGIN
	 set @query = @query + ' IN (1,7) AND CreatedBy =' + @UserID
   END
  if(@role = 'appr')
   BEGIN
	 set @query = @query + '= 3 AND UploadReviewer =' + @userID
   END 
   EXEC(@query)
END


GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_DIM_GetAllUploadHeaders]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_DIM_GetAllUploadHeaders]
AS
BEGIN

SELECT  * FROM [dbo].[T_FQM_DIM_UploadHeader] 

END
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_DIM_UploadHeader_WorkFlow]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_DIM_UploadHeader_WorkFlow]

AS  
BEGIN  
	SELECT  
		UH.UploadDescription as description,
		(select top 1 user_name from users_roles where user_id = WFM.CreatedBy ) as  createdBy,
		WFM.CreatedOn AS date,
		(select top 1 StatusDescription user_name from T_COM_WF_WorkFlowStatus where WorkflowRecordId = WFM.FromStatus ) as  fromStatus,
		Case (select top 1 StatusDescription user_name from T_COM_WF_WorkFlowStatus where WorkflowRecordId = WFM.ToStatus )
		WHEN 'Draft' THEN 'Upload Metric Created'
		ELSE (select top 1 StatusDescription user_name from T_COM_WF_WorkFlowStatus where WorkflowRecordId = WFM.ToStatus )
		END	as  action,
		WFM.comment
	FROM T_COM_WF_WorkFlowMasterMaintenance AS WFM
	INNER JOIN T_FQM_DIM_UploadHeader UH ON UH.UploadRecordId = WFM.ImpactedRecordId
	ORDER BY UH.UploadDescription
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_GetAll_DIM_UploadHeadersByID]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_GetAll_DIM_UploadHeadersByID]
@UploadRecordId BigInt
AS
BEGIN
	SELECT  
		UploadRecordId as uploadRequestID,
		SiteRecordId,
		uploadDescription,
		UploadStartDate as startDate,
		UploadEndDate as endDate,
		UH.KPIRecordId as mericTypeID,
		w.StatusDescription as status,
		CreatedOn As uploadDate,(select top 1 user_name from users_roles where user_id = UH.CreatedBy ) as  uploadedBy,
		(select top 1 user_name from users_roles where user_id = UH.UploadReviewer ) as  approvedBy,
		(select top 1 UploadObjectDescription from T_COM_MD_UPL_UploadObjectMaster where UploadObjectID = UH.KPIRecordId ) as  metricsUpload 
	FROM T_FQM_DIM_UploadHeader UH 
	INNER JOIN T_COM_WF_WorkFlowStatus w on UH.WFStatusId = w.WorkFlowRecordID
	WHERE UH.UploadRecordId = @UploadRecordId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_GetAllSites]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_GetAllSites]
AS
BEGIN

SELECT 
SiteRecordId AS [id],
Plant AS [bu],
Entity AS [site],
Plant AS [plantCode],
FEI AS [feiNumber],
       FEI  AS [dunsNumber],
   '' AS [production],
   '' AS [profitCenter],
   ResponsibleSite1 AS [siteName],
   '' AS [siteAddress]        	
 FROM [dbo].[T_LKP_SitePlantMaintenance] 
WHERE FDA in ('1','2','3')
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_Remove_TMP_MD_SitePlantMaintenance]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_Remove_TMP_MD_SitePlantMaintenance]
@recordId varchar(50)
AS
BEGIN
	UPDATE T_TMP_UPL_MD_SitePlantMaintenance 
	SET ActiveFlag= 0
	WHERE SiteRecordId= @recordId	
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_TMP_Remove_SI03A_IPCStabilityTests]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_TMP_Remove_SI03A_IPCStabilityTests]
@recordId varchar(50)
AS
BEGIN
	UPDATE T_TMP_FFT_UPL_SI03A_IPCStabilityTests 
	SET UploadFlag= 0
	WHERE UploadDataRecordId= @recordId	
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_TMP_Update_SI03A_IPCStabilityTests]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_TMP_Update_SI03A_IPCStabilityTests]
@recordId varchar(50),
@planskaLokacija varchar(200),
@materialNumber varchar(200)
AS
BEGIN
	UPDATE T_TMP_FFT_UPL_SI03A_IPCStabilityTests 
	SET PLANSKA_LOKACIJA= @planskaLokacija,
		 MaterialNumber = @materialNumber
	WHERE UploadDataRecordId= @recordId	
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_Update_DIM_UploadHeaders_ByID]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_Update_DIM_UploadHeaders_ByID]
@UploadRecordId BigInt,
@description varchar(200),
@startDate date,
@endDate date
AS
BEGIN
	UPDATE T_FQM_DIM_UploadHeader 
	set uploadDescription=@description, 
		UploadStartDate=@startDate, 
		UploadEndDate=@endDate 
	WHERE UploadRecordId = @UploadRecordId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_Update_DIM_UploadMetricStatus]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_Update_DIM_UploadMetricStatus]
(
@uploadMetricActions AS dbo.uploadMetricActions READONLY,
@UpdateBy VARCHAR(100), 
@status nvarchar(100)
) 

AS
BEGIN

declare @i int;
select @i =  max(WorkflowChangeRecordId) + 1  from T_COM_WF_WorkFlowMasterMaintenance;
  SET NOCOUNT ON;

	insert into T_COM_WF_WorkFlowMasterMaintenance (
		WorkflowChangeRecordId,
		ImpactedRecordId, 
		FromStatus, 
		ToStatus, 
		CreatedBy, 
		CreatedOn,
		Comment
	)
	select  ROW_NUMBER() over( order by a.UploadMetricID) + @i , a.UploadMetricID, uh.WFStatusId, @status, @UpdateBy, GETDATE(), a.Comments 
	from @uploadMetricActions as a inner join T_FQM_DIM_UploadHeader as uh on a.UploadMetricID = uh.UploadRecordId;

	update T_FQM_DIM_UploadHeader 
		set  WFStatusId = @status,
			UpdateBy = @UpdateBy,
			UpdatedOn = GETDATE()
		where UploadRecordId  IN (SELECT UploadMetricID FROM @uploadMetricActions);   
END

GO
/****** Object:  StoredProcedure [dbo].[SP_LKP_Update_TMP_MD_SitePlantMaintenance]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LKP_Update_TMP_MD_SitePlantMaintenance]
@recordId varchar(50),
@country varchar(5),
@region varchar(100),
@entity varchar(100),
@technology varchar(100)

AS
BEGIN
	UPDATE T_TMP_UPL_MD_SitePlantMaintenance
	SET	Country=@country, 
		Region=@region, 
		Entity=@entity, 
		Technology=@technology	
	WHERE SiteRecordId= @recordId	
END
GO
/****** Object:  StoredProcedure [dbo].[SpComGET_GetAllSite]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpComGET_GetAllSite] 
@objectName varchar(100)
AS
BEGIN
SELECT 
	SiteRecordId AS id,
	Entity AS [site],
	Plant,
	FEI AS [feiNumber],
	DUNS  AS [dunsNumber],
	Region,
	Technology,
   '' AS [production],
   '' AS [profitCenter],
   ResponsibleSite1 AS [siteName],
   '' AS [siteAddress]        	
 FROM [dbo].[T_COM_LKP_SitePlantMaintenance]
WHERE  SiteRecordId IN (SELECT ObjectValue FROM EQARP_SYS.dbo.T_SYS_UM_UserGroup UG WHERE UG.AppObjectName = @objectName) 

END
GO
/****** Object:  StoredProcedure [dbo].[SpComGET_GetProducts]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpComGET_GetProducts] @SiteId nvarchar(50) AS
BEGIN
select ProcessingSiteRecordID,PRODUCTNDC,ProcessingPlant,PROPRIETARYNAME,ACTIVE_NUMERATOR_STRENGTH,ACTIVE_INGRED_UNIT,APPLICATIONNUMBER
from V_INT_COM_PopulateScheduleDetails
where  ProcessingSiteRecordID = @SiteId
END
GO
/****** Object:  StoredProcedure [dbo].[SpComGET_GetSite]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  PROCEDURE [dbo].[SpComGET_GetSite] @SiteRecordId nvarchar(50) AS
BEGIN
declare @TEMP1 table (UserID nvarchar(50));
declare @TEMP2  table (UserID nvarchar(50));
 
Select DUNS,FEI,Region,Plant,Technology from [EQARP_DWH_BKPJul23].[dbo].[T_COM_LKP_SitePlantMaintenance]  where SiteRecordId = @SiteRecordId
 
insert into @TEMP1
select UserID from [EQARP_SYS].[dbo].[T_SYS_UM_AuthorizationMaster] where UserGroupId in 
(select UserGroupId from [EQARP_SYS].[dbo].[T_SYS_UM_UserGroup] where ObjectValue = @SiteRecordId and RoleID = 2 )
--and IsActive = 'Yes'
 
insert into @TEMP2
select UserID from [EQARP_SYS].[dbo].[T_SYS_UM_AuthorizationMaster] where UserGroupId in 
(select UserGroupId from [EQARP_SYS].[dbo].[T_SYS_UM_UserGroup] where ObjectValue = @SiteRecordId and RoleID = 3 )
--and IsActive = 'Y'
 
--select UserID from @TEMP1
--select UserID from @TEMP2

select FirstName,UserId from [EQARP_SYS].[dbo].[T_SYS_UM_User] where UserID in (select UserID from @TEMP1)
select FirstName,UserId from [EQARP_SYS].[dbo].[T_SYS_UM_User] where UserID in (select UserID from @TEMP2)
 
END
GO
/****** Object:  StoredProcedure [dbo].[SpComGET_Schedule]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpComGET_Schedule] @userrole nvarchar(50), @userid nvarchar(10) AS
	BEGIN
	if ( @userrole = 'Global Plant Coordinator')
	BEGIN
	Select * from T_FQM_DIM_ScheduleHeader where CreatedBy  = @userid and 
	StatusId = 21 or StatusId = 19
	--in ( 
	--select WorkflowRecordId from T_COM_WF_WorkFlowStatus where 
	--StatusDescription = 'Draft' or StatusDescription = 'Sent for Schedule Modification')
	END
	if( @userrole = 'Site Reviewer' )
	BEGIN
	Select * from T_FQM_DIM_ScheduleHeader where SitePlanCoordinator  = @userid and 
	StatusId = 20 or StatusId = 24
	--in ( 
	--select WorkflowRecordId from T_COM_WF_WorkFlowStatus where 
	--StatusDescription = 'Define for Scope' or StatusDescription = 'Sent for Scope Modification')
	END
	if( @userrole = 'Site Approver' )
	BEGIN
	Select * from T_FQM_DIM_ScheduleHeader where SitePlanReviewer  = @userid and 
	StatusId = 23
	--in ( 
	--select WorkflowRecordId from T_COM_WF_WorkFlowStatus where 
	--StatusDescription = 'Send for Approval' )
	END
	END

	--select * from T_COM_WF_WorkFlowStatus where ApplicationId = 1 and ApplicationObjectId = 5
GO
/****** Object:  StoredProcedure [dbo].[SpComSAVE_CreateSchedule]    Script Date: 29-07-2017 13:16:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpComSAVE_CreateSchedule] 
@ScheduleRecordId nvarchar(100), 
@ScheduleDescription nvarchar(100), @ScheduleStartDate date, @ScheduleEndDate date, 
@KPIRecordId nvarchar(20),@SitePlanCoordinator nvarchar(50), @SitePlanReviewer nvarchar(50),
@CreatedBy nvarchar(50), @StatusId nvarchar(20), @InsertDept_TVP ScheduleDescTVP READONLY
AS
BEGIN

INSERT INTO T_FQM_DIM_ScheduleHeader
 (ScheduleRecordId, ScheduleDescription, ScheduleStartDate, ScheduleEndDate, KPIRecordId, SitePlanCoordinator, SitePlanReviewer, CreatedBy, StatusId) 
  VALUES 
 (@ScheduleRecordId, @ScheduleDescription, @ScheduleStartDate, @ScheduleEndDate,@KPIRecordId, @SitePlanCoordinator, @SitePlanReviewer, @CreatedBy, @StatusId)


 --INSERT INTO T_FQM_FFT_ScheduleDetail
 --(ScheduleRecordId, ScheduleDescription, ScheduleStartDate, ScheduleEndDate, KPIRecordId, SitePlanCoordinator, SitePlanReviewer, CreatedBy, StatusId) 
 -- VALUES 
 --(@ScheduleRecordId, @ScheduleDescription, @ScheduleStartDate, @ScheduleEndDate,@KPIRecordId, @SitePlanCoordinator, @SitePlanReviewer, @CreatedBy, @StatusId)

  END
GO


