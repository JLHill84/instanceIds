(aws ec2 describe-instances --output json | ConvertFrom-Json).Reservations.Instances.InstanceId

aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId, State.Name]' --output text