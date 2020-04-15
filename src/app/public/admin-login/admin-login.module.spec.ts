import { AdminLoginModule } from './admin-login.module';

describe('AdminLoginModule', () => {
    let adminLoginModule: AdminLoginModule;

    beforeEach(() => {
        adminLoginModule = new AdminLoginModule();
    });

    it('should create an instance', () => {
        expect(adminLoginModule).toBeTruthy();
    });
});
