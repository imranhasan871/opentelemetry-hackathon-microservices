const ENUM = Object.freeze({
  UserStatus: {
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
    BLOCKED: "BLOCKED",
  },
  UserRole: {
    ADMIN: "ADMIN",
    USER: "USER",
  },
  VerificationStatus: {
    PENDING: "PENDING",
    EXPIRED: "EXPIRED",
    USED: "USED",
  },
  VerificationType: {
    ACCOUNT_VERIFICATION: "ACCOUNT_VERIFICATION",
    PASSWORD_RESET: "PASSWORD_RESET",
  },
  VerificationExpiredAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
});

module.exports = ENUM;
