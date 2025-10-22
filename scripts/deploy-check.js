#!/usr/bin/env node

/**
 * Deployment validation script for karpov-portfolio
 * Checks for common deployment issues before deploying
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();

class DeploymentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
  }

  error(message) {
    this.errors.push(message);
    this.log(message, 'error');
  }

  warning(message) {
    this.warnings.push(message);
    this.log(message, 'warning');
  }

  success(message) {
    this.log(message, 'success');
  }

  checkNodeVersion() {
    try {
      const version = execSync('node --version', { encoding: 'utf8' }).trim();
      this.success(`Node.js version: ${version}`);

      const majorVersion = parseInt(version.slice(1).split('.')[0]);
      if (majorVersion < 18) {
        this.warning('Node.js version is below 18. Consider upgrading for better performance.');
      }
    } catch (err) {
      this.error('Failed to check Node.js version');
    }
  }

  checkNpmVersion() {
    try {
      const version = execSync('npm --version', { encoding: 'utf8' }).trim();
      this.success(`npm version: ${version}`);

      const majorVersion = parseInt(version.split('.')[0]);
      if (majorVersion < 8) {
        this.warning('npm version is below 8. Consider upgrading.');
      }
    } catch (err) {
      this.error('Failed to check npm version');
    }
  }

  checkBuildOutput() {
    if (!existsSync(join(PROJECT_ROOT, 'out'))) {
      this.warning('No build output directory found. Run "npm run build" first.');
    } else {
      this.success('Build output directory exists');
    }
  }

  checkWranglerConfig() {
    const wranglerPath = join(PROJECT_ROOT, 'wrangler.toml');
    if (!existsSync(wranglerPath)) {
      this.error('wrangler.toml not found');
      return;
    }

    try {
      const content = readFileSync(wranglerPath, 'utf8');

      if (!content.includes('pages_build_output_dir')) {
        this.error('wrangler.toml missing pages_build_output_dir');
      } else {
        this.success('wrangler.toml contains pages_build_output_dir');
      }

      if (!content.includes('compatibility_date')) {
        this.warning('wrangler.toml missing compatibility_date');
      }

    } catch (err) {
      this.error('Failed to read wrangler.toml');
    }
  }

  checkRedirects() {
    const redirectsPath = join(PROJECT_ROOT, 'public', '_redirects');
    if (!existsSync(redirectsPath)) {
      this.warning('No _redirects file found');
      return;
    }

    try {
      const content = readFileSync(redirectsPath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const parts = line.split(/\s+/);

        if (parts.length >= 3) {
          const statusCode = parts[parts.length - 1];

          // Check for invalid status codes
          if (statusCode === '404') {
            this.error(`Invalid status code 404 in _redirects line ${i + 1}: "${line}"`);
          }

          // Check for potential infinite loops
          if (line.includes('/*') && line.includes('/index.html') && !line.includes('!')) {
            this.warning(`Potential infinite loop in _redirects line ${i + 1}: "${line}" (consider adding !)`);
          }
        }
      }

      if (this.errors.length === 0) {
        this.success('_redirects file looks valid');
      }
    } catch (err) {
      this.error('Failed to read _redirects file');
    }
  }

  checkPackageJson() {
    try {
      const packagePath = join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

      if (!packageJson.scripts || !packageJson.scripts.build) {
        this.error('package.json missing build script');
      } else {
        this.success('package.json has build script');
      }

      if (packageJson.dependencies) {
        const outdatedPackages = [
          'rimraf', 'glob', 'domexception', 'abab',
          '@humanwhocodes/object-schema', '@humanwhocodes/config-array'
        ];

        for (const pkg of outdatedPackages) {
          if (packageJson.dependencies[pkg] || packageJson.devDependencies?.[pkg]) {
            this.warning(`Consider updating deprecated package: ${pkg}`);
          }
        }
      }
    } catch (err) {
      this.error('Failed to read package.json');
    }
  }

  async run() {
    console.log('🚀 Starting deployment validation...\n');

    // Basic environment checks
    this.checkNodeVersion();
    this.checkNpmVersion();
    this.checkBuildOutput();

    // Configuration checks
    this.checkPackageJson();
    this.checkWranglerConfig();
    this.checkRedirects();

    console.log('\n📊 Validation Summary:');
    console.log(`Errors: ${this.errors.length}`);
    console.log(`Warnings: ${this.warnings.length}`);

    if (this.errors.length > 0) {
      console.log('\n❌ Deployment blocked due to errors:');
      this.errors.forEach(error => console.log(`  - ${error}`));
      process.exit(1);
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Deployment warnings:');
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    if (this.errors.length === 0) {
      console.log('\n✅ Deployment validation passed!');
    }
  }
}

// Run the validator
const validator = new DeploymentValidator();
validator.run().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});