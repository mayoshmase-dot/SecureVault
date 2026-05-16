import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ar',
    debug: true,

    resources: {
      en: {
        translation: {
          // Navbar
          SecureVault: "SecureVault",
          Home: "Home",
          Dashboard: "Dashboard",
          Logout: "Logout",
          Generate: "Generate",
          Profile: "Profile",
          SignIn: "Sign In",
          SignUp: "Sign Up",

          // Hero
          "Secure Your Passwords in One Safe Vault ": "Secure Your Passwords in One Safe Vault",
          "Store, manage, and generate strong passwords with advanced encryption and two-factor authentication.": "Store, manage, and generate strong passwords with advanced encryption and two-factor authentication.",
          "Create Account": "Create Account",

          // Features
          Features: "Features",
          "Secure Encryption": "Secure Encryption",
          "Secure Encryption text": "All data is fully encrypted.",
          "Password Generator": "Password Generator",
          "Password Generator text": "Create strong random passwords.",
          "Two Factor Authentication": "Two Factor Authentication",
          "Two Factor Authentication text": "Extra layer of protection.",
          "Fast Search": "Fast Search",
          "Fast Search text": "Find credentials instantly.",

          // Footer
          "Palestine Technical University – Kadoorie": "Palestine Technical University – Kadoorie",
          "SecureVault – Password Manager": "SecureVault – Password Manager",
          "A secure platform to store and manage your credentials safely.": "A secure platform to store and manage your credentials safely.",
          "Prepared by: Maya Masri, Sojood Zidan": "Prepared by: Maya Masri, Sojood Zidan",
          "SecureVault – All rights reserved.": "SecureVault – All rights reserved.",

          // Login
          "Sign In title": "Sign In",
          "Access your secure vault": "Access your secure vault",
          "Don't have an account yet?": "Don't have an account yet?",
          "Enter your email": "Enter your email",
          "Remember me": "Remember me",
          "Forgot Password?": "Forgot Password?",
          "Sign In button": "Sign In",

          // Forgot Password
          "Recover Account": "Recover Account",
          "Recover Account button": "Recover Account",
          "Use your recovery key to regain access": "Use your recovery key to regain access",
          "Recovery Key": "Recovery Key",
          "Back to Login": "Back to Login",

          // Register
          "Sign Up title": "Sign Up",
          "Create your secure account": "Create your secure account",
          "Enter the code sent to your email": "Enter the code sent to your email",
          "Already have an account?": "Already have an account?",
          "Your name": "Your name",
          "Confirm Password": "Confirm Password",
          "Verification Code": "Verification Code",
          "6-digit code": "6-digit code",
          "By creating an account, you agree to our": "By creating an account, you agree to our",
          Terms: "Terms",
          and: "and",
          "Privacy Policy": "Privacy Policy",
          "Send Verification Code": "Send Verification Code",
          "Create Account button": "Create Account",
          Back: "Back",

          // Credentials
          "Credentials Vault": "Credentials Vault",
          All: "All",
          Personal: "Personal",
          Work: "Work",
          Finance: "Finance",
          Social: "Social",
          Other: "Other",
          "No credentials found": "No credentials found",
          "No results for": "No results for",
          "No credentials in": "No credentials in",
          Details: "Details",
          "Edit Credential": "Edit Credential",

          // VaultControl
          "Search your vault...": "Search your vault...",
          Generator: "Generator",
          "Add New": "Add New",

          // StatCard
          "Strong Passwords": "Strong Passwords",
          "Weak Passwords": "Weak Passwords",
          "Reused Passwords": "Reused Passwords",
          "New Password": "New Password",

          // PasswordExpiryBanner
          password_expiry_one: "1 password hasn't been updated in 90+ days — Review it",
          password_expiry_other: "{{count}} passwords haven't been updated in 90+ days — Review them",

          // Verify2FA
          "Two-Factor Authentication": "Two-Factor Authentication",
          "Enter your 6-digit code": "Enter your 6-digit code",
          "Verified Successfully": "Verified Successfully",
          "Redirecting to dashboard...": "Redirecting to dashboard...",
          Verify: "Verify",

          // AddCredential
          "Add New Credential": "Add New Credential",
          "Fill in the details to secure your account": "Fill in the details to secure your account",
          "Title / Service Name": "Title / Service Name",
          "e.g. Google, Netflix, Work Email": "e.g. Google, Netflix, Work Email",
          "Username / Email": "Username / Email",
          "Username or email": "Username or email",
          "Website URL (Optional)": "Website URL (Optional)",
          "Note (Optional)": "Note (Optional)",
          "Write a note...": "Write a note...",
          "Tags (Optional)": "Tags (Optional)",
          "Write a tag...": "Write a tag...",
          "Save Credential": "Save Credential",
          Strength: "Strength",

          // CredentialDetails
          Hide: "Hide",
          Show: "Show",
          Created: "Created",
          Updated: "Updated",
          "Failed to decrypt data. Wrong master password?": "Failed to decrypt data. Wrong master password?",

          // UpdateCredential
          "Update Credential": "Update Credential",
          "Update your saved credentials": "Update your saved credentials",
          "No Changes": "No Changes",
          "You have not made any changes.": "You have not made any changes.",
          "Write tags...": "Write tags...",

          // GeneratePassword
          "Uppercase (A-Z)": "Uppercase (A-Z)",
          "Lowercase (a-z)": "Lowercase (a-z)",
          "Numbers (0-9)": "Numbers (0-9)",
          "Symbols (!@#$)": "Symbols (!@#$)",
          "Create strong, unhackable passwords": "Create strong, unhackable passwords",
          "Click Generate...": "Click Generate...",
          Regenerate: "Regenerate",
          Copy: "Copy",
          "Password Strength": "Password Strength",
          "Password Length": "Password Length",
          STRONG: "STRONG",
          GOOD: "GOOD",
          FAIR: "FAIR",
          WEAK: "WEAK",
          "Generating...": "Generating...",
          "Generate Password": "Generate Password",

          // Shared
          Email: "Email",
          Password: "Password",
          Name: "Name",
          Username: "Username",
          Category: "Category",
          Notes: "Notes",
          Tags: "Tags",
          Save: "Save",
          Cancel: "Cancel",
          Delete: "Delete",
          Enabled: "Enabled",
          Disabled: "Disabled",

          // ChangePassword
          "Change Password": "Change Password",
          "Use a strong password": "Use a strong password",
          "Current Password": "Current Password",
          "Enter your current password": "Enter your current password",
          "Enter your new password": "Enter your new password",
          "Update Password": "Update Password",

          // Profile Sidebar
          Info: "Info",
          Language: "Language",
          "Delete Account": "Delete Account",

          // Profile2FA
          "Secure your account": "Secure your account",
          "Enable 2FA": "Enable 2FA",
          "2FA Enabled": "2FA Enabled",
          "Backup Codes": "Backup Codes",
          Done: "Done",
          "Disable 2FA?": "Disable 2FA?",
          "Your account will be less secure": "Your account will be less secure",
          Disable: "Disable",
          "Disabled title": "Disabled",
          "2FA is enabled": "2FA is enabled",

          // ProfileInfo
          "New email": "New email",
          "Master password": "Master password",
          "Send Code": "Send Code",
          "Code sent to": "Code sent to",
          "2FA": "2FA",

          // ProfileDelete
          "Irreversible action": "Irreversible action",
          "All your data will be permanently deleted.": "All your data will be permanently deleted.",
          "Master Password": "Master Password",
          "Enter Master password": "Enter Master password",
          "Delete Account?": "Delete Account?",
          "This action is irreversible.": "This action is irreversible.",
          "Yes, delete it": "Yes, delete it",
          Error: "Error",
          // BackButton
"Back to Dashboard": "Back to Dashboard",
        }
      },

      ar: {
        translation: {
          // Navbar
          SecureVault: "سيكيور فولت",
          Home: "الرئيسية",
          Dashboard: "لوحة التحكم",
          Logout: "تسجيل الخروج",
          Generate: "توليد كلمة مرور",
          Profile: "الملف الشخصي",
          SignIn: "تسجيل الدخول",
          SignUp: "إنشاء حساب",

          // Hero
          "Secure Your Passwords in One Safe Vault ": "احفظ كلمات مرورك في خزنة آمنة",
          "Store, manage, and generate strong passwords with advanced encryption and two-factor authentication.": "خزّن وأدر وولّد كلمات مرور قوية مع تشفير متقدم والمصادقة الثنائية.",
          "Create Account": "إنشاء حساب",

          // Features
          Features: "المميزات",
          "Secure Encryption": "تشفير آمن",
          "Secure Encryption text": "جميع البيانات مشفرة بالكامل.",
          "Password Generator": "مولّد كلمات المرور",
          "Password Generator text": "أنشئ كلمات مرور عشوائية قوية.",
          "Two Factor Authentication": "المصادقة الثنائية",
          "Two Factor Authentication text": "طبقة حماية إضافية لحسابك.",
          "Fast Search": "بحث سريع",
          "Fast Search text": "ابحث عن بياناتك فوراً.",

          // Footer
          "Palestine Technical University – Kadoorie": "جامعة فلسطين التقنية – خضوري",
          "SecureVault – Password Manager": "سيكيور فولت – مدير كلمات المرور",
          "A secure platform to store and manage your credentials safely.": "منصة آمنة لتخزين وإدارة بياناتك بأمان.",
          "Prepared by: Maya Masri, Sojood Zidan": "إعداد: مايا مصري، سجود زيدان",
          "SecureVault – All rights reserved.": "سيكيور فولت – جميع الحقوق محفوظة.",

          // Login
          "Sign In title": "تسجيل الدخول",
          "Access your secure vault": "ادخل إلى خزنتك الآمنة",
          "Don't have an account yet?": "ليس لديك حساب بعد؟",
          "Enter your email": "أدخل بريدك الإلكتروني",
          "Remember me": "تذكرني",
          "Forgot Password?": "نسيت كلمة المرور؟",
          "Sign In button": "تسجيل الدخول",

          // Forgot Password
          "Recover Account": "استعادة الحساب",
          "Recover Account button": "استعادة الحساب",
          "Use your recovery key to regain access": "استخدم مفتاح الاسترداد لاستعادة حسابك",
          "Recovery Key": "مفتاح الاسترداد",
          "Back to Login": "العودة لتسجيل الدخول",

          // Register
          "Sign Up title": "إنشاء حساب",
          "Create your secure account": "أنشئ حسابك الآمن",
          "Enter the code sent to your email": "أدخل الكود المرسل إلى بريدك",
          "Already have an account?": "لديك حساب بالفعل؟",
          "Your name": "اسمك",
          "Confirm Password": "تأكيد كلمة المرور",
          "Verification Code": "كود التحقق",
          "6-digit code": "كود مكون من 6 أرقام",
          "By creating an account, you agree to our": "بإنشاء حساب، أنت توافق على",
          Terms: "الشروط",
          and: "و",
          "Privacy Policy": "سياسة الخصوصية",
          "Send Verification Code": "إرسال كود التحقق",
          "Create Account button": "إنشاء الحساب",
          Back: "رجوع",

          // Credentials
          "Credentials Vault": "خزنة البيانات",
          All: "الكل",
          Personal: "شخصية",
          Work: "أعمال",
          Finance: "مالية",
          Social: "اجتماعية",
          Other: "أخرى",
          "No credentials found": "لا توجد بيانات",
          "No results for": "لا نتائج لـ",
          "No credentials in": "لا توجد بيانات في",
          Details: "التفاصيل",
          "Edit Credential": "تعديل البيانات",

          // VaultControl
          "Search your vault...": "ابحث في خزنتك...",
          Generator: "مولّد كلمات المرور",
          "Add New": "إضافة جديد",

          // StatCard
          "Strong Passwords": "كلمات المرور القوية",
          "Weak Passwords": "كلمات المرور الضعيفة",
          "Reused Passwords": "كلمات المرور المكررة",
          "New Password": "كلمة المرور الجديدة",
          // PasswordExpiryBanner
          password_expiry_one: "كلمة مرور واحدة لم يتم تحديثها منذ 90+ يوم — راجعها",
          password_expiry_other: "{{count}} كلمة مرور لم يتم تحديثها منذ 90+ يوم — راجعها",

          // Verify2FA
          "Two-Factor Authentication": "المصادقة الثنائية",
          "Enter your 6-digit code": "أدخل الكود المكون من 6 أرقام",
          "Verified Successfully": "تم التحقق بنجاح",
          "Redirecting to dashboard...": "جارٍ التوجيه للوحة التحكم...",
          Verify: "تحقق",

          // AddCredential
          "Add New Credential": "إضافة بيانات جديدة",
          "Fill in the details to secure your account": "أدخل التفاصيل لتأمين حسابك",
          "Title / Service Name": "العنوان / اسم الخدمة",
          "e.g. Google, Netflix, Work Email": "مثال: جوجل، نتفليكس، بريد العمل",
          "Username / Email": "اسم المستخدم / البريد الإلكتروني",
          "Username or email": "اسم المستخدم أو البريد",
          "Website URL (Optional)": "رابط الموقع (اختياري)",
          "Note (Optional)": "ملاحظة (اختياري)",
          "Write a note...": "اكتب ملاحظة...",
          "Tags (Optional)": "وسوم (اختياري)",
          "Write a tag...": "اكتب وسماً...",
          "Save Credential": "حفظ البيانات",
          Strength: "القوة",

          // CredentialDetails
          Hide: "إخفاء",
          Show: "إظهار",
          Created: "تاريخ الإنشاء",
          Updated: "تاريخ التعديل",
          "Failed to decrypt data. Wrong master password?": "فشل فك التشفير. هل كلمة المرور الرئيسية صحيحة؟",

          // UpdateCredential
          "Update Credential": "تعديل البيانات",
          "Update your saved credentials": "عدّل بياناتك المحفوظة",
          "No Changes": "لا يوجد تغييرات",
          "You have not made any changes.": "لم تقم بأي تغييرات.",
          "Write tags...": "اكتب وسوماً...",

          // GeneratePassword
          "Uppercase (A-Z)": "أحرف كبيرة (A-Z)",
          "Lowercase (a-z)": "أحرف صغيرة (a-z)",
          "Numbers (0-9)": "أرقام (0-9)",
          "Symbols (!@#$)": "رموز (!@#$)",
          "Create strong, unhackable passwords": "أنشئ كلمات مرور قوية لا يمكن اختراقها",
          "Click Generate...": "اضغط توليد...",
          Regenerate: "توليد جديد",
          Copy: "نسخ",
          "Password Strength": "قوة كلمة المرور",
          "Password Length": "طول كلمة المرور",
          STRONG: "قوية",
          GOOD: "جيدة",
          FAIR: "مقبولة",
          WEAK: "ضعيفة",
          "Generating...": "جارٍ التوليد...",
          "Generate Password": "توليد كلمة مرور",

          // Shared
          Email: "البريد الإلكتروني",
          Password: "كلمة المرور",
          Name: "الاسم",
          Username: "اسم المستخدم",
          Category: "الفئة",
          Notes: "الملاحظات",
          Tags: "الوسوم",
          Save: "حفظ",
          Cancel: "إلغاء",
          Delete: "حذف",
          Enabled: "مفعّلة",
          Disabled: "معطّلة",

          // ChangePassword
          "Change Password": "تغيير كلمة المرور",
          "Use a strong password": "استخدم كلمة مرور قوية",
          "Current Password": "كلمة المرور الحالية",
          "Enter your current password": "أدخل كلمة المرور الحالية",
          "Enter your new password": "أدخل كلمة المرور الجديدة",
          "Update Password": "تحديث كلمة المرور",

          // Profile Sidebar
          Info: "المعلومات",
          Language: "اللغة",
          "Delete Account": "حذف الحساب",

          // Profile2FA
          "Secure your account": "أمّن حسابك",
          "Enable 2FA": "تفعيل المصادقة الثنائية",
          "2FA Enabled": "تم تفعيل المصادقة الثنائية",
          "Backup Codes": "رموز الاسترداد",
          Done: "تم",
          "Disable 2FA?": "تعطيل المصادقة الثنائية؟",
          "Your account will be less secure": "سيصبح حسابك أقل أماناً",
          Disable: "تعطيل",
          "Disabled title": "تم التعطيل",
          "2FA is enabled": "المصادقة الثنائية مفعّلة",

          // ProfileInfo
          "New email": "البريد الجديد",
          "Master password": "كلمة المرور الرئيسية",
          "Send Code": "إرسال الكود",
          "Code sent to": "تم إرسال الكود إلى",
          "2FA": "المصادقة الثنائية",

          // ProfileDelete
          "Irreversible action": "إجراء لا يمكن التراجع عنه",
          "All your data will be permanently deleted.": "سيتم حذف جميع بياناتك نهائياً.",
          "Master Password": "كلمة المرور الرئيسية",
          "Enter Master password": "أدخل كلمة المرور الرئيسية",
          "Delete Account?": "حذف الحساب؟",
          "This action is irreversible.": "هذا الإجراء لا يمكن التراجع عنه.",
          "Yes, delete it": "نعم، احذفه",
          Error: "خطأ",
          // BackButton
          "Back to Dashboard": "العودة للوحة التحكم",
        }
      }
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;