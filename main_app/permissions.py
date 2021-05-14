from rest_framework import permissions

class IsSetupOwner(permissions.BasePermission):
  def has_permission(self, request, view):
      return True
  def has_object_permission(self, request, view, obj):
      if request.method in permissions.SAFE_METHODS:
        return True
      return obj.created_by == request.user

class IsInteractionOwner(permissions.BasePermission):
  def has_permission(self, request, view):
      return True
  def has_object_permission(self, request, view, obj):
      if request.method in permissions.SAFE_METHODS:
        return True
      return obj.user == request.user