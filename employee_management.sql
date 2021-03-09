/*
 Navicat Premium Data Transfer

 Source Server         : Connection
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : employee_management

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 09/03/2021 14:31:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_employee
-- ----------------------------
DROP TABLE IF EXISTS `tb_employee`;
CREATE TABLE `tb_employee`  (
  `id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_employee
-- ----------------------------
INSERT INTO `tb_employee` VALUES ('BS003', 'John', 'Leon', '8732913457', '255 Wilbrod Street', 'Manager');
INSERT INTO `tb_employee` VALUES ('BS006', 'Jim', 'Jones', '8748291281', '253 Bank Street', 'Accountant');
INSERT INTO `tb_employee` VALUES ('FN000', 'Katy', 'Johnson', '8234578121', '718 Cathcart Street', 'Accountant');
INSERT INTO `tb_employee` VALUES ('FN001', 'Jimmy', 'John', '8912345709', '127 Somerset Street', 'Accountant');
INSERT INTO `tb_employee` VALUES ('FN002', 'Sam', 'Aaron', '8123475818', '52 Osgoode Street', 'Accountant');
INSERT INTO `tb_employee` VALUES ('FN003', 'Rachael', 'Green', '8234567819', '133 Wilbrod Street', 'Accountant');
INSERT INTO `tb_employee` VALUES ('FN004', 'Jim', 'Brown', '8234568919', '87 King Street', 'Manager');
INSERT INTO `tb_employee` VALUES ('HR002', 'Scarlett', 'Miller', '8747182347', '77 Rideau Street', 'Assistant');
INSERT INTO `tb_employee` VALUES ('HR003', 'Evelyn', 'Brown', '8674382712', '817 Daly Ave', 'Director');
INSERT INTO `tb_employee` VALUES ('HR004', 'Ella', 'Johnson', '8567349217', '82 Osgoode Street', 'Manager');
INSERT INTO `tb_employee` VALUES ('HR005', 'Madison', 'Wilson', '8172346182', '874 Templeton Street', 'Director');
INSERT INTO `tb_employee` VALUES ('HR006', 'Lucy', 'Murphy', '8234578172', '764 Wilbrod Street', 'Manager');
INSERT INTO `tb_employee` VALUES ('HR007', 'Kinsley', 'Green', '8235718283', '87 Mann Ave', 'Assistant');
INSERT INTO `tb_employee` VALUES ('IT001', 'Scott', 'Liu', '8732880212', '255 Wilbrod Street', 'Developer');
INSERT INTO `tb_employee` VALUES ('IT002', 'John', 'Doe', '8732881372', '245 Nelson Street', 'Developer');
INSERT INTO `tb_employee` VALUES ('IT003', 'Jack', 'Williams', '8732718290', '73 Rideau Street', 'Project Manager');
INSERT INTO `tb_employee` VALUES ('IT004', 'Liam', 'James', '8271362719', '364 Bank Street', 'Tester');
INSERT INTO `tb_employee` VALUES ('IT005', 'Jay', 'Smith', '8371927491', '784 Bank Street', 'Tester');
INSERT INTO `tb_employee` VALUES ('IT006', 'Jim', 'Aaron', '8172393754', '127 Somerset Street', 'Developer');
INSERT INTO `tb_employee` VALUES ('IT007', 'Samuel', 'James', '8738191823', '264 Wilbrod Street', 'Developer');

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('admin', 'b9d11b3be25f5a1a7dc8ca04cd310b28');

SET FOREIGN_KEY_CHECKS = 1;
