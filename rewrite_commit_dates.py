import subprocess
import random
import datetime

# Set time range: April 12, 6 PM → April 14, 3 AM
start_time = datetime.datetime(2025, 4, 12, 18, 0, 0)
end_time = datetime.datetime(2025, 4, 14, 3, 0, 0)

# Generate random time within the range
def random_time():
    delta = end_time - start_time
    random_seconds = random.randint(0, int(delta.total_seconds()))
    return (start_time + datetime.timedelta(seconds=random_seconds)).strftime('%Y-%m-%dT%H:%M:%S')

# Get all commits across all branches (oldest first)
print("📦 Getting all commits...")
commit_hashes = subprocess.check_output([
    "git", "rev-list", "--reverse", "--all"
]).decode().strip().split("\n")

# Build a dictionary of random times
commit_times = {}
for commit in commit_hashes:
    commit_times[commit] = random_time()

print(f"🎯 Rewriting {len(commit_times)} commits...")

# Use filter-branch with per-commit timestamps
env_filter_script = 'if false; then\n'
for commit, ts in commit_times.items():
    env_filter_script += f'elif [ "$GIT_COMMIT" = "{commit}" ]; then\n'
    env_filter_script += f'    export GIT_AUTHOR_DATE="{ts}"\n'
    env_filter_script += f'    export GIT_COMMITTER_DATE="{ts}"\n'
env_filter_script += 'fi\n'

with open("env_filter.sh", "w") as f:
    f.write(env_filter_script)

# Run git filter-branch
subprocess.run([
    "git", "filter-branch",
    "--env-filter", ". ./env_filter.sh",
    "--tag-name-filter", "cat",
    "--", "--all"
], shell=True)

print("\n✅ Done rewriting commit dates!")
print("⚠️ Now run:")
print("   git push --force --all")
print("   git push --force --tags")
