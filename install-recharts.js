
const { execSync } = require('child_process');

try {
  console.log('Installing recharts...');
  execSync('npm install recharts', { 
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: 'cmd.exe'
  });
  console.log('✓ recharts installed successfully!');
} catch (error) {
  console.error('Failed to install recharts:', error.message);
  process.exit(1);
}
